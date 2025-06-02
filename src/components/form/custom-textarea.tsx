import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useBaseForm, baseFormPropTypes } from './base-form-component';

const classInputBase = 'form-control';

const CustomTextArea = (props) => {
  const inputRef = useRef(null);
  const { error, setInputValue, changeError } = useBaseForm(props, inputRef);

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    changeError(event);
    props.handleInputChange(event);
  };

  return (
    <div className={`form-group ${props.className || ''}`}>
      {props.label !== false && (
        <label className="form-label">
          {props.label || props.title}
        </label>
      )}
      <textarea
        ref={inputRef}
        className={`${classInputBase} ${error ? 'is-invalid' : ''}`}
        name={props.name}
        value={props.value}
        onChange={handleChange}
        title={props.title}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

CustomTextArea.propTypes = {
  ...baseFormPropTypes,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

CustomTextArea.defaultProps = {
  label: '',
  title: '',
  name: null,
  className: '',
  value: '',
  errorMessage: '',
  submit: false,
  validate: [],
  handleInputChange: () => {},
  isValidate: false
};

export default CustomTextArea;
