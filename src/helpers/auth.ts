import { getCookie, deleteCookie, setCookie } from 'cookies-next';
import employer from '@/configs/employer'
import { store } from '@/stores'

export const getMenu = (item, path: string) => {
    let role = employer.EMPLOYER
    item.map(item => {
        if (item.child) {
            role = getMenu(item.child, path)
        }
        if (item.url == path) {
            role = item.role
        }
    })
    return role
}
export async function checkAuth(router: any) {
    if (getCookie(employer.AUTH) && getCookie(employer.DEVICE)) {
        // các trang đã đăng nhập thì không được vào
        if (employer.PATH_REQUIRED_AUTH.includes(router.pathname)) {
            router.push(employer.PATH_DEFAULT)
        }
        
        return true
       
        // deleteCookie(employer.AUTH)
        // deleteCookie(employer.DEVICE)
    }
    if (employer.LIST_URL_NOT_AUTH.includes(router.pathname)) {
        return true;
    }
    router.push(employer.PATH_LOGIN)
    return false
}