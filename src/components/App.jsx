import React, { useEffect, useState } from "react";
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import css from './App.module.css';
import ContactForm from './ContactForm/ContactForm'; 
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";


const App = () => {
  const [contacts, setContacts] = useState(() => {
    const storage = localStorage.getItem('contacts');
    if (storage === null) {
      localStorage.setItem('contacts', JSON.stringify([
        { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
        { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
        { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
        { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
      ]));

      return JSON.parse(localStorage.getItem('contacts'));
    } else {
      return JSON.parse(storage);
    }
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const newContacts = contacts;
    const storage = JSON.stringify(newContacts);
    localStorage.setItem('contacts', storage);
  }, [contacts]);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const newContact = { id: nanoid(6), name: name, number: number };

    if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase(),)) {
      Notiflix.Notify.warning(`${name} is already in contacts.`,{
        position: 'center-top',
        closeButton: true,
        timeout: 1500,
        width: '350px',
      });
    } else if (contacts.find(contact => contact.number.toLowerCase() === number.toLowerCase(),)) {
      Notiflix.Notify.warning(`The number ${number} is already in contacts.`,{
        position: 'center-top',
        closeButton: true,
        timeout: 1500,
        width: '350px',
      });
    } else {
      setContacts(oldContacts => [...oldContacts, newContact]);
      form.reset();
    }
  };

  const filterChange = event => {
    setFilter(event.target.value);
  };

  const filterContacts = () => {
    const newArray = contacts.filter(contact => {
      const lowerValue = filter.toLowerCase();
      return contact.name.toLowerCase().includes(lowerValue);
    });
    return newArray;
  };

  const deleteContact = contactID => {
    const newList = contacts.filter(contact => contact.id !== contactID);
    setContacts(newList);
  };

    return (
      <div className={css.container}>
        <h1 className={css.header}>Phonebook</h1>
        <ContactForm handleSubmit={handleSubmit} />
        <h2 className={css.secondHeader}>Contacts</h2>
        <Filter filter={filter} handleChange={filterChange} />
        <ContactList filterContacts={filterContacts} onDelete={deleteContact}/>
      </div>
    );
};

export default App;





