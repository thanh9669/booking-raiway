import React, { useRef, useState } from 'react';
import { useBaseForm, baseFormPropTypes } from './base-form-component';
import PropTypes from 'prop-types';

const classInputBase = 'form-control';
const classIconBase = 'input-group-text cursor-pointer';

const CustomInput = (props) => {
  const inputRef = useRef(null);
  const { error, setInputValue, changeError } = useBaseForm(props, inputRef);
  const [iconInput, setIconInput] = useState(props.icon);
  const [typeInput, setTypeInput] = useState(props.type);

  const handleChange = (event) => {
    setInputValue(event?.target?.value ?? event.value);
    props.handleInputChange(event);
    changeError(event);
  };

  const handleClick = () => {
    if (iconInput) {
      const iconCurrent = props.icon === iconInput ? props.iconHide : props.icon
      setIconInput(iconCurrent)
      const typeInputCurrent = props.type === typeInput ? props.typeHide : props.type
      setTypeInput(typeInputCurrent)
    }
  }

  return (
    <div className={`form-group ${props.className || ''}`}>
      {props.label !== false && (
        <label className="form-label">
          {props.label || props.title}
        </label>
      )}
      <div className="input-group">
        <input
          ref={inputRef}
          type={typeInput}
          className={`${classInputBase} ${error ? 'is-invalid' : ''}`}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          onChange={handleChange}
          onBlur={handleChange}
          title={props.title}
          />
          {iconInput && (
            <span className={classIconBase} onClick={handleClick}>
              <i className={iconInput}></i>
            </span>
          )}
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
      {props.description && (
        <div className="form-text">{props.description}</div>
      )}
    </div>
  );
};

CustomInput.propTypes = {
  ...baseFormPropTypes,
  icon: PropTypes.string,
  iconHide: PropTypes.string,
  type: PropTypes.string,
  typeHide: PropTypes.string,
  description: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

CustomInput.defaultProps = {
  icon: '',
  iconHide: '',
  type: 'text',
  typeHide: 'password',
  description: '',
  placeholder: null,
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

export default CustomInput;
