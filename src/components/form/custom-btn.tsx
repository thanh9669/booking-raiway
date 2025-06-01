import { useState, useEffect } from 'react'
import React from 'react'
import PropTypes from 'prop-types'; // Import PropTypes
interface CustomBtnProps {
    label?: string,
    type: "button" | "submit" | "reset",
    className?: string
    isLoad?: boolean
}
const CustomBtn: React.FC<CustomBtnProps>  = (props) => {
    const [isLoad, setIsLoad] = useState(props.isLoad)
    useEffect(() => {
        setIsLoad(props.isLoad)
    }, [props.isLoad])
    
    return (
        <>
            <div className={props.className}>
                <button className="btn btn-primary d-grid w-100" type={props.type} disabled={isLoad}>{props.label}</button>
             </div>
        </>
    )
}
CustomBtn.propTypes = {
    label: PropTypes.string,
    type: PropTypes.any.isRequired,
    className: PropTypes.string,
    isLoad: PropTypes.bool.isRequired,
};
CustomBtn.defaultProps = {
    label: '',
    type: 'button',
    className: 'mb-3',
    isLoad: false
}
export default CustomBtn