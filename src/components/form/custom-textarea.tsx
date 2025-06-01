import { useState, useEffect, useRef } from 'react';
import validate from '@/mixis/validate'; // Check spelling 'mixis' vs 'mixins'
import React from 'react'
import PropTypes from 'prop-types'; // Import PropTypes

// type CustomTextAreaProps = {
//   type: string;
//   value?: string;
//   errorMessage: string;
//   title?: string;
//   label?: string | false;
//   className?: string;
//   name?: string | null;
//   validate?: any; // Adjust type based on your validation logic
//   handleError?: (event: ChangeEvent<HTMLTextAreaElement>, error: string) => void;
//   handleInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
//   submit?: boolean;
// };

const classInputBase = 'form-control';

const CustomTextArea = (props) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(props.value);
  const [error, setError] = useState(props.errorMessage);
  const [title] = useState(props.title);

  useEffect(() => {
    setError(props.errorMessage);
  }, [props.errorMessage]);

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (props.validate && props.handleError) {
      const validationError = validate.validate(props.validate, event.target);
      setError(validationError);
      props.handleError(event, validationError);
    }
    props.handleInputChange(event);
  };

  useEffect(() => {
    if (props.submit && inputRef.current) {
      handleChange({ target: inputRef.current });
    }
    setInputValue(props.value);
  }, [props, handleChange]);

  return (
    <>
      <div className={props.className}>
        {props.label && <label htmlFor="email" className="form-label">{props.label}</label>}
        <textarea
          ref={inputRef}
          value={inputValue ?? ''}
          title={title ?? ''}
          onChange={handleChange}
          onBlur={handleChange}
          className={`${classInputBase} ${error ? 'input-error' : ''}`}
          name={props.name ?? undefined}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
    </>
  );
};
CustomTextArea.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  errorMessage: PropTypes.string,
  submit: PropTypes.bool,
  validate: PropTypes.array,
  handleInputChange: PropTypes.func,
  handleError: PropTypes.func,
};

CustomTextArea.defaultProps = {
  label: '',
  title: '',
  type: 'text',
  name: null,
  className: '',
  value: '',
  errorMessage: '',
  submit: false,
  validate: [],
  handleInputChange: () => {}, // Adjust based on your logic
};

export default CustomTextArea;
