import { checkAuth } from '@/helpers/auth'
import Loading from '@/components/loading.tsx'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function withAuth(Component) {
  const Auth = (props) => {
    const router = useRouter()
    const [data, setData] = useState(false)
    const [isHydrated, setIsHydrated] = useState(false)
    useEffect(() => {
      setIsHydrated(true)
    }, [])
    useEffect(() => {
      if (isHydrated) {
        const fetchData = async() => {
          const user = await checkAuth(router)
          setData(user)
        }
        fetchData()
      }
    }, [isHydrated])
    if (!data) {
      return <Loading/>
    }
    return <Component {...props} />
  };

  if (Component.getLayout) {
    Auth.getLayout = Component.getLayout
  }

  return Auth
}