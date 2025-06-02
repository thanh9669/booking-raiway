import { useState, useEffect, useRef } from 'react';
import validate from '@/mixis/validate';
import PropTypes from 'prop-types';

type BaseFormProps = {
  value?: string;
  errorMessage?: string;
  title?: string;
  label?: string | false;
  className?: string;
  name?: string | null;
  validate?: any[];
  handleError?: (event: any, error: string) => void;
  handleInputChange: (event: any) => void;
  submit?: boolean;
  isValidate?: boolean;
};

export const useBaseForm = (props: BaseFormProps, ref: React.RefObject<any>) => {
  const [inputValue, setInputValue] = useState(props.value);
  const [error, setError] = useState(props.errorMessage);

  const changeError = (event: any) => {
    if (props.validate && props.handleError) {
      const validationError = validate.validate(props.validate, event?.target ?? event);
      setError(validationError);
      props.handleError(event, validationError);
    }
  };

  useEffect(() => {
    setError(props.errorMessage);
  }, [props.errorMessage]);

  useEffect(() => {
    if (props.isValidate && ref.current) {
      changeError(ref.current);
    }
  }, [props.isValidate]);

  return {
    inputValue,
    error,
    setInputValue,
    setError,
    changeError
  };
};

export const baseFormPropTypes = {
  label: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  errorMessage: PropTypes.string,
  validate: PropTypes.array,
  handleInputChange: PropTypes.func.isRequired,
  handleError: PropTypes.func,
  submit: PropTypes.bool,
  isValidate: PropTypes.bool
};
