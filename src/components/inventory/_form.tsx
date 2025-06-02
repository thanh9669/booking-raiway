import CustomSelect from '@/components/form/custom-select'
import CustomInput from '@/components/form/custom-input'
import {PRODUCT_INVENTORY} from '@/types/product'
import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types';

const InventoryForm = (props) => {
    const productList = [
        {
            id: 1,
            name: 'Nước loc 1' 
        },
        {
            id: 2,
            name: 'Nước loc 2' 
        },
        {
            id: 3,
            name: 'Nước loc 3' 
        },
        {
            id: 4,
            name: 'Nước loc 4' 
        }
    ]

    const units = [
        {
            id: 1,
            name: 'Lọ' 
        },
        {
            id: 2,
            name: 'Chai' 
        },
        {
            id: 3,
            name: 'Túi' 
        },
        {
            id: 4,
            name: 'Thùng' 
        }
    ]
    // const defaultData: PRODUCT_INVENTORY =  {
    //     id: 0,
    //     name: '',
    //     quantity: 0,
    //     price: 0,
    //     unit: '',
    //     totalPrice: 0,
    //     productionDate: '',
    //     expirationDate: ''
    // }
    const [product, setProduct] =  useState<PRODUCT_INVENTORY>()
    const [errorMessage, setErrorMessage] = useState<PRODUCT_INVENTORY>()
    const handleChange = (event) => {
        let { name, value } = event.target
        setProduct((prevState) => ({ ...prevState, [name]: value }))
    }
      
    const handleError = (name, errors) => {
        setErrorMessage({
        ...errorMessage,
        [name]: errors
        })
    }
    useEffect(() => {
        if (props.submit) {
            props.getData({
                ...product, 
                totalPrice: product.price*product.quantity,
                unit_text: units[parseInt(product?.unit)]['name'],
                name: productList[parseInt(product?.product_id.toString())]['name']
            })
            console.log(units[parseInt(product?.unit)])
            setProduct(null)
            setErrorMessage(null)
        }
    }, [props.submit])
    return (
        <>
            <div className="row">
                <div className="col mb-2">
                    <CustomSelect 
                        name="product_id" 
                        title="Sản phẩm"
                        label="Sản phẩm"
                        validate={['required']}
                        options={productList.map(p => ({...p, id: p.id.toString()}))}
                        value={product?.product_id?.toString()} 
                        handleError={handleError}
                        errorMessage={ errorMessage?.product_id?.toString() }
                        handleInputChange={handleChange}
                    />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col mb-0">
                    <CustomInput 
                        name="quantity" 
                        type="text" 
                        title="Số lượng"
                        label="Số lượng"
                        validate={['required', 'number']}
                        placeholder="Số lượng"
                        value={product?.quantity?.toString()}
                        errorMessage={ errorMessage?.quantity?.toString() }
                        handleInputChange={handleChange}
                        handleError={handleError}
                    />
                </div>
                <div className="col mb-0">
                    <CustomSelect 
                        name="unit" 
                        title="Đơn vị"
                        label="Đơn vị"
                        validate={['required']}
                        options={units.map(u => ({...u, id: u.id.toString()}))}
                        value={product?.unit?.toString()} 
                        errorMessage={ errorMessage?.unit?.toString() }
                        handleError={handleError}
                        handleInputChange={handleChange}
                    />
                </div>
                <div className="col mb-0">
                    <CustomInput 
                        name="price" 
                        type="number" 
                        title="Giá tiền"
                        label="Giá tiền"
                        validate={['required', 'number']}
                        placeholder="Giá tiền"
                        errorMessage={ errorMessage?.price?.toString() }
                        value={product?.price?.toString()} 
                        handleInputChange={handleChange}
                        handleError={handleError}
                    />
                </div>
            </div>
            <div className="row g-6">
                <div className="col mb-0">
                    <CustomInput 
                        name="productionDate" 
                        type="datetime-local" 
                        title="Ngày SX"
                        label="Ngày SX"
                        validate={['required']}
                        placeholder="Ngày SX"
                        errorMessage={ errorMessage?.productionDate?.toString() }
                        value={product?.productionDate?.toString()} 
                        handleInputChange={handleChange}
                        handleError={handleError}
                    />
                </div>
                <div className="col mb-0">
                    <CustomInput 
                        name="expirationDate" 
                        type="datetime-local" 
                        title="Ngày hết hạn"
                        label="Ngày hết hạn"
                        validate={['required']}
                        placeholder="Ngày hết hạn"
                        errorMessage={ errorMessage?.expirationDate?.toString() }
                        value={product?.expirationDate?.toString()} 
                        handleInputChange={handleChange}
                        handleError={handleError}
                    />
                </div>
            </div>
        </>
    )
}

InventoryForm.propTypes = {
    submit: PropTypes.bool.isRequired,
    getData: PropTypes.func.isRequired
};
InventoryForm.defaultProps = {
    submit: false,
}
export default InventoryForm;