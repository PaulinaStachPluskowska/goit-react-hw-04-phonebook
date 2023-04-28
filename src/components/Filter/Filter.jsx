import PropTypes from 'prop-types';
import React from 'react';
import css from './Filter.module.css';

const Filter = ({filter, handleChange}) => {
    
    return (
        <label className={css.label}>
            Find contacts by Name
            <input className={css.input}
              type="text"
              name="filter"
              filter={filter}
              onChange={handleChange}
            />
        </label>
    );
};

Filter.propTypes = {
    handleChange: PropTypes.func,
    filter: PropTypes.string.isRequired,
};

export default Filter;