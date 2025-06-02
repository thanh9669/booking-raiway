import CustomSelect from '@/components/form/custom-select'
import CustomInput from '@/components/form/custom-input'
import { EXPENSE } from '@/types/expense'
import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import ModulesApi from '@/api/moduleApi'
import { ENUMS } from '@/enums/index.js'
import toast from '@/helpers/toast'

const ExpenseForm = (props) => {
    const { expenseApi } = ModulesApi()
    const [expense, setExpense] =  useState<EXPENSE>()
    const [errorMessage, setErrorMessage] = useState<EXPENSE>()
    
    const handleChange = (event) => {
        let { name, value } = event.target
        setExpense((prevState) => ({ ...prevState, [name]: value }))
        console.log(event.target, name, value)
    }
      
    const handleError = (name, errors) => {
        setErrorMessage({
        ...errorMessage,
        [name]: errors
        })
    }
    const submitData = async () => {
        if (!expense?.category_id && props.categories.length) {
            expense.category_id = props.categories[0].id
        }
        const resp = await expenseApi.post({
            ...expense,
            amount: parseInt(expense.amount.toString()),
            category_id: parseInt(expense.category_id.toString())
        }) as any
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
                        <CustomSelect 
                            name="category_id" 
                            title="Sản phẩm"
                            label="Sản phẩm"
                            validate={['required']}
                            options={props.categories}
                            value={expense?.category_id?.toString()} 
                            handleError={handleError}
                            errorMessage={ errorMessage?.category_id?.toString() }
                            handleInputChange={handleChange}
                        />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col mb-0">
                        <CustomInput 
                            name="amount" 
                            type="text" 
                            title="Số lượng"
                            label="Số lượng"
                            validate={['required', 'number']}
                            placeholder="Số lượng"
                            value={expense?.amount?.toString()}
                            errorMessage={ errorMessage?.amount?.toString() }
                            handleInputChange={handleChange}
                            handleError={handleError}
                        />
                    </div>
                </div>
                <div className="row g-6">
                    <div className="col mb-0">
                        <CustomInput 
                            name="note" 
                            title="Ghi chú"
                            label="Ghi chú"
                            validate={['required']}
                            placeholder="Ghi chú"
                            errorMessage={ errorMessage?.note?.toString() }
                            value={expense?.note?.toString()} 
                            handleInputChange={handleChange}
                            handleError={handleError}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

ExpenseForm.propTypes = {
    submit: PropTypes.bool.isRequired,
    actionSubmit: PropTypes.func.isRequired,
    categories:  PropTypes.array.isRequired,
};
ExpenseForm.defaultProps = {
    submit: false,
}
export default ExpenseForm;
