import React, { useRef } from 'react';
import { useBaseForm, baseFormPropTypes } from './base-form-component';
import PropTypes from 'prop-types';

const classInputBase = 'form-select';

const CustomSelect = (props) => {
  const inputRef = useRef(null);
  const { error, changeError } = useBaseForm(props, inputRef);

  const handleChange = (event) => {
    if (event) {
      props.handleInputChange(event);
      changeError(event);
    }
  };

  return (
    <div className={`form-group ${props.className || ''}`}>
      {props.label !== false && (
        <label className="form-label">
          {props.label || props.title}
        </label>
      )}
      <select
        ref={inputRef}
        className={`${classInputBase} ${error ? 'is-invalid' : ''}`}
        name={props.name}
        value={props.value}
        onChange={handleChange}
        title={props.title}
      >
        {props.options.map((option, index) => (
          <option key={`${option.id}-${index}`} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
      {props.description && (
        <div className="form-text">{props.description}</div>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  ...baseFormPropTypes,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  description: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

CustomSelect.defaultProps = {
  label: '',
  title: '',
  name: null,
  className: '',
  value: '',
  errorMessage: '',
  submit: false,
  validate: [],
  handleInputChange: () => {},
  isValidate: false,
  description: ''
};

export default CustomSelect;