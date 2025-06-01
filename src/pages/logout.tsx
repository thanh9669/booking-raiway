
import { deleteCookie } from 'cookies-next';
import employer from '@/configs/employer'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Logout = () => {
  const router = useRouter()
  deleteCookie(employer.AUTH)
  deleteCookie(employer.DEVICE)
  // localStorage.removeItem(employer.CONFIGS)
  useEffect(() => {
    router.push(employer.PATH_LOGIN)
  }, [])
}

export default Logout;