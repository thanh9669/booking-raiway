import { toast } from 'react-toastify'
const opt = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

export default  {
    error(text: string) {
        toast.error(text)
    },
    success(text: string) {
        toast.success(text)
    },
    warn(text: string) {
        toast.warn(text)
    },
    info(text: string) {
        toast.info(text)
    }
}