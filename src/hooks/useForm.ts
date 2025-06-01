import { checkErrorMessage } from '@/helpers/common'
import { useState, useEffect } from 'react'

export const useForm = () => {
    const [errorMessage, setErrorMessage] = useState({})
    const [errorValidation, setErrorValidation] = useState(false)
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const validation = async () => {
        await sleep(500);
    }
    
    return {
        errorValidation, 
        setErrorValidation,
        errorMessage,
        setErrorMessage,
        validation,
    }
}