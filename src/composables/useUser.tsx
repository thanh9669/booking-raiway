import { useState, useEffect } from 'react'
import menuConfig from "@/configs/menu"
import { useDispatch, useSelector  } from 'react-redux'
import type { RootState } from '@/stores'
import employer from '@/configs/employer'
import { useRouter } from 'next/router'


export const useUser = () => {
    const router = useRouter()
    const [employers, setEmployer] = useState();
    const [ menu ] = useState(menuConfig.nav);
    const info = useSelector((state: RootState) => state.employer.info)
    const getMenu = (item: any, path: string) => {
        let role = ''

        item.map((item: any) => {
            if (item.child) {
                role = getMenu(item.child, path)
            }
            if (item.url == path) {
                role = item.role
            }
        })
        return role
    }

    const checkRole = (path: string ) => {
        if (info.role ==  getMenu(menu, path)) {
            router.push(employer.PATH_DEFAULT)
        }
        return false
    }
    return {
        employers,
        checkRole
    }
}

