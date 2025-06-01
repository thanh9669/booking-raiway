import React, { useState, useEffect, useRef } from 'react';
import { ENUMS } from '@/enums/index';
import { Repose, ConfigApi } from '@/types/index';
import configApi from '@/configs/api';
import PropTypes from 'prop-types'; // Import PropTypes
import ModulesApi from '@/api/moduleApi'

interface CustomInputProps {
  label?: boolean | string;
  title?: string;
  type?: string;
  name?: string | null;
  icon?: string;
  errorMessage?: string | null;
  className?: string;
  placeholder?: string | null;
  value: {name: string} | null;
  handleInputChange: (event: {}) => void;
  submit?: boolean;
}

const classInputBase = 'form-control';

const CustomInput: React.FC<CustomInputProps> = (props) => {
  const { authApi } = ModulesApi()
  const inputRef = useRef<HTMLInputElement>(null);
  // const [iconInput, setIconInput] = useState(props.icon);
  const [typeInput] = useState(props.type);
  const [image, setImage] = useState('');
  const [error, setError] = useState(props.errorMessage);

  useEffect(() => {
    if (props.value && props.value.name) {
      setImage(configApi?.rootImage + props?.value?.name);
    }
  }, [props.value]);

  useEffect(() => {
    setError(props.errorMessage);
  }, [props.errorMessage]);

  const handleChange = async (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const resp = (await authApi.file( formData)) as Repose;
        if (resp?.status === ENUMS.SUCCESS) {
          const img = resp?.data?.data;
          props.handleInputChange({ target: { name: event.target.name, value: img } });
          setImage(configApi.rootImage + img);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  return (
    <>
      <div className={props.className}>
        {props.label && <label htmlFor="email" className="form-label">{props.label}</label>}
        <input
          ref={inputRef}
          type={typeInput}
          title={props.title}
          onChange={handleChange}
          className={`${classInputBase} ${error ? 'input-error' : ''}`}
          name={props.name ?? undefined}
          placeholder={props.placeholder ?? ''}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      {image && <img src={image} className="d-block rounded mt-2" width="100" height="100" alt="Uploaded" />}
    </>
  );
};
CustomInput.propTypes = {
  label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  title: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  handleInputChange: PropTypes.func.isRequired,
  submit: PropTypes.bool,
};
CustomInput.defaultProps = {
  label: false,
  title: '',
  type: 'text',
  name: null,
  icon: '',
  errorMessage: null,
  className: '',
  placeholder: null,
  value: null,
  submit: false,
};

export default CustomInput;
