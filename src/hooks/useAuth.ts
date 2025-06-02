import { useState, useEffect } from 'react'
import { checkErrorMessage } from '@/helpers/common'
import { useSession } from 'next-auth/react'
import { setCookie } from 'cookies-next'
import { store } from '@/stores'
import { setAuthState } from '@/stores/employer'
import ModulesApi from '@/api/moduleApi'
import Router from 'next/router'
import toast from '@/helpers/toast'
import employer from '@/configs/employer'
import { useForm } from '@/hooks/useForm'
import { ENUMS } from '@/enums'


export const useAuth = () => {
  const { 
    errorValidation, 
    setErrorValidation,
    validation,
    isError,
    setIsError,
    } = useForm()
  const [loading, setLoading] = useState(false)
  const [isSubmit, setIsSubmit] = useState(false)
  const { authApi } = ModulesApi()
  const [errorMessage, setErrorMessage] = useState({
    email: '',
    password: ''
  })
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const handleError = (event, errors) => {
      const name = event?.target?.name ?? event.name;
      const resultError = {
          ...errorMessage,
          [name]: errors
      }
      setErrorMessage(resultError)
      console.log(resultError, "handleError")
      setIsError(checkErrorMessage(resultError, name, errors))
  }
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  useEffect(() => {
    console.log(isSubmit, isError)
    if (!isError  && isSubmit) {
      sendDataApi()
    }
  }, [isSubmit])

  const sendDataApi = async () => {
      setLoading(true)
      const resp = await authApi.login(formData) as any
      if (resp?.status == ENUMS.VALIDATION) {
        setErrorMessage(resp?.data?.errors);
      }
      if (resp?.data?.errors) {
        toast.error(resp?.data.message)
      }
      if (resp?.data?.token) {
        setCookie(employer.AUTH, resp?.data?.token)
        localStorage.setItem(employer.AUTH, resp?.data?.token)
        console.log(resp?.data?.data, "token")
        setCookie(employer.DEVICE, resp?.data?.token)
        authApi.setDefault(resp?.data?.token)
        const user = await authApi.detail({ device: resp?.data?.device}, resp?.data?.data)
        if (user?.data?.data) {
          await store.dispatch(setAuthState(user?.data?.data))
        }
        toast.success(resp?.data.message)
        Router.push(employer.PATH_DEFAULT)
      }
      setLoading(false)
      setIsSubmit(false)
  }

  const  handlerSignUp = async (event) => {
    setIsSubmit(true)
    event.preventDefault();
    setErrorValidation(true)
    await validation()
    setErrorValidation(false)
    setIsSubmit(false)
    return 
  }
  return {
    loading,
    errorMessage,
    formData,
    isSubmit,
    handleError,
    handleChange,
    handlerSignUp,
    errorValidation,
    isError
  }
}
