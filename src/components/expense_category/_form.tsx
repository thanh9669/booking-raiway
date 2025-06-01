import CustomSelect from '@/components/form/custom-select'
import CustomInput from '@/components/form/custom-input'
import {EXPENSE_CATEGORY, EXPENSE} from '@/types/expense'
import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import ModulesApi from '@/api/moduleApi'
import { ENUMS } from '@/enums/index.js'
import toast from '@/helpers/toast'

const ExpenseCategoryForm = (props) => {
    const { expenseApi } = ModulesApi()
    const [category, setCategory] =  useState<EXPENSE_CATEGORY>()
    const [errorMessage, setErrorMessage] = useState<EXPENSE_CATEGORY>()
    const categories = props.categories.length ? props.categories : [{
        id: 0,
        name: "Danh muc cha"
    }]
    const handleChange = (event) => {
        let { name, value } = event.target
        setCategory((prevState) => ({ ...prevState, [name]: value }))
        console.log(name, value)
    }
      
    const handleError = (name, errors) => {
        setErrorMessage({
        ...errorMessage,
        [name]: errors
        })
    }
    const submitData = async () => {
        const resp = await expenseApi.postCategory({...category, is_default: 1}) as any
        if (resp?.errors) {
            setErrorMessage(resp?.errors)
        }
        if (resp.status == ENUMS.SUCCESS) {
            toast.success(resp.data.message)
        }
        props.actionSubmit(resp.status == ENUMS.SUCCESS)
    }
    useEffect(() => {
        const allNull = errorMessage ? Object.values(errorMessage).every(value => value === null) : false;
        if (props.submit && allNull) {
            submitData()
        }
    }, [props.submit])
    return (
        <>
            <div>
                <div className="row">
                    <div className="col mb-2">
                        <CustomInput 
                            name="name" 
                            type="text" 
                            title="Tên"
                            label="Tên"
                            validate={['required']}
                            placeholder="Tên"
                            value={category?.name?.toString()}
                            errorMessage={ errorMessage?.name?.toString() }
                            handleInputChange={handleChange}
                            handleError={handleError}
                        />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col mb-0">
                        <CustomInput 
                            name="icon" 
                            type="text" 
                            title="Icon"
                            label="Icon"
                            validate={['required']}
                            placeholder="Icon"
                            value={category?.icon?.toString()}
                            errorMessage={ errorMessage?.icon?.toString() }
                            handleInputChange={handleChange}
                            handleError={handleError}
                        />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col mb-0">
                        <CustomSelect 
                            name="parent_id" 
                            title="Danh mục cha"
                            label="Danh mục cha"
                            validate={['required']}
                            placeholder="Danh mục cha"
                            options={categories}
                            value={category?.parent_id?.toString()} 
                            handleError={handleError}
                            errorMessage={ errorMessage?.parent_id?.toString() }
                            handleInputChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

ExpenseCategoryForm.propTypes = {
    submit: PropTypes.bool.isRequired,
    actionSubmit: PropTypes.func.isRequired,
    categories:  PropTypes.array.isRequired,
};
ExpenseCategoryForm.defaultProps = {
    submit: false,
}
export default ExpenseCategoryForm;
