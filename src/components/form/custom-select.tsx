import { useState, useEffect, useRef } from 'react';
import validate from '@/mixis/validate'
import React from 'react'
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

// type Item = {
//     id: string,
//     name: string
// }
// type CustomSelectProps = {
//     label?: string,
//     title?: string,
//     name: string,
//     description?: string,
//     validate?: Array<string>,
//     className?: string,
//     placeholder?: string | null,
//     value: string,
//     errorMessage: string | null,
//     submit?: boolean,
//     options: Array<Item>,
//     handleInputChange: (data: {value:string, target: {value:string}}) => void;
//     handleError: ({}, error: string) => void;
// }
const classInputBase = 'form-select'
const CustomSelect = (props) => {
    const inputRef = useRef(null);
    // const state = useSelector((state) => state.state.value);
    // const [inputValue, setInputValue] = useState(props.value)
    const [error, setError] = useState(props.errorMessage)
    const [title] = useState(props.title);
    // const [title] = useState(props.title)
    // lắng nghe props mesage có lỗi gì không
    useEffect(() => {
        setError(props.errorMessage)
    }, [props.errorMessage])

    useEffect(() => {
        setError(props.errorMessage)
    }, [props.errorMessage])
    // thực hiện emit thay đổi khi input change dữ liệu
    const handleChange = (event) => {
        if (event) {
            // setInputValue(event?.value ?? event.target.value)
            console.log(event)
            props.handleInputChange(event)
            if (props.validate) {
                const errors = validate.validate(props.validate, event.target ?? event)
                setError(errors)
                props.handleError(event.target.name, errors)
            }
        }
    }
    // check event submit form 
    useEffect(() => {
        if (props.submit) {
          handleChange(inputRef.current ?? null)
            // const t = handleChange(inputRef.current ?? null)
        }
        // setInputValue(props.value)
    }, [props])
    return (
        <>
            <div className={props.className}>
                {props.label && <label className="form-label">{ props.label }</label> }
                {props.options.length > 0 && (
                <div>
                    <select title={title} className={`${classInputBase}`} name={props.name} onChange={handleChange} value={props.value}>
                    {
                        props.options.map((item)=> (
                        <option key={item.id} value={item.id} >
                            {item.name}
                        </option>
                        ))
                    }
                    </select>
                </div>
                )}
            </div>
            { error != "" && <div className="error-message">{error}</div> }
        </>
    )
}

CustomSelect.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  validate: PropTypes.array,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  errorMessage: PropTypes.string,
  submit: PropTypes.bool,
  options: PropTypes.any.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
};

CustomSelect.defaultProps = {
    label: "",
    title: '',
    name: null,
    description: 'Default Description',
    validate: [],
    className: '',
    placeholder: null,
    value: '',
    errorMessage: null,
    submit: false,
    options: []
};
export default CustomSelect;