import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import validate from '@/mixis/validate'
import PropTypes from 'prop-types'; // Import PropTypes
import React from 'react'

// interface CustomInputProps {
//   icon?: string
//   type?: string
//   value?: string
//   errorMessage?: string
//   title?: string
//   label?: boolean | string
//   className?: string
//   name?: string | null
//   placeholder?: string | null
//   iconHide?: string
//   typeHide?: string
//   description?: string
//   validate?: any[] // Define a more specific type for validation rules if possible
//   submit?: boolean
//   handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
//   handleError?: (event: ChangeEvent<HTMLInputElement>, error: string) => void
// }

const classInputBase = 'form-control'
const classIconBase = 'input-group-text cursor-pointer'

const CustomInput = (props) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const isValidate = useState(props.isValidate)
    const [iconInput, setIconInput] = useState(props.icon)
    const [typeInput, setTypeInput] = useState(props.type)
    const [inputValue, setInputValue] = useState(props.value)
    const [error, setError] = useState(props.errorMessage)
    const title = props.title
    
    useEffect(() => {
        setError(props.errorMessage)
    }, [props.errorMessage])

    useEffect(() => {
        if (props.isValidate) {
            changeError(inputRef.current)
        }
    }, [props.isValidate])

    const handleChange = (event) => {
        setInputValue(event?.target?.value ?? event.value)
        props.handleInputChange(event)
        changeError(event)
    }

    const changeError = (event) => {
        if (props.validate) {
            const validationError = validate.validate(props.validate, event?.target ?? event)
            setError(validationError)
            props.handleError?.(event, validationError)
        }
    }

    useEffect(() => {
        if (props.submit && inputRef.current) {
            handleChange(inputRef.current)
        }
        setInputValue(props.value)
    }, [props.submit, props.value])

    const handleClick = () => {
        if (iconInput) {
            const iconCurrent = props.icon === iconInput ? props.iconHide : props.icon
            setIconInput(iconCurrent)
            const typeInputCurrent = props.type === typeInput ? props.typeHide : props.type
            setTypeInput(typeInputCurrent)
        }
    }

    return (
        <>
            <div className={props.className}>
                {props.label && <label className="form-label">{props.label}</label>}
                <input
                    ref={inputRef}
                    type={typeInput}
                    value={inputValue ?? ''}
                    title={title}
                    onChange={handleChange}
                    onBlur={handleChange}
                    className={`${classInputBase} ${error ? 'input-error' : ''}`} 
                    name={props.name ?? ''}
                    placeholder={props.placeholder ?? ''}
                />
                {props.icon && <span className={`z-9999 ${classIconBase} ${error ? 'input-error' : ''}`} onClick={handleClick}><i className={iconInput ?? ''}></i></span>}
            </div>
            {error && <div className="error-message">{error}</div>}
        </>
    )
}
CustomInput.propTypes = {
  icon: PropTypes.string, // Define prop types
  iconHide: PropTypes.string,
  type: PropTypes.string,
  typeHide: PropTypes.string,
  value: PropTypes.string,
  errorMessage: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  description: PropTypes.string,
  validate: PropTypes.arrayOf(PropTypes.any), // Adjust for your validation logic
  submit: PropTypes.bool,
  handleInputChange: PropTypes.func.isRequired,
  handleError: PropTypes.func,
  isValidate: PropTypes.bool
};

CustomInput.defaultProps = {
    label: false,
    title: '',
    type: 'text',
    typeHide: 'text',
    name: null,
    icon: '',
    iconHide: '',
    description: 'Default Description',
    validate: [],
    className: '',
    placeholder: null,
    value: '',
    errorMessage: '',
    submit: false,
    isValidate: false
}

export default CustomInput
