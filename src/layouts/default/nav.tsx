
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import menuConfig from "@/configs/menu"
import NavItem, { Item } from "./nav_item"
import { store } from '@/stores/index'
function Navigate() {
    const { employer } = store.getState()
    const router = useRouter()
    const [menuActive, setMenuActive] = useState("/home")
    const [menu, setMenu] = useState(menuConfig.nav)
    useEffect(() => {
      async function activeMenu() {
        let pathnameCurrent: string| null = null
        const pathname = router.pathname.split("/")
        let countMatch = 0
        menu.map((item) => {
          const data = item.url.split("/")
          let countC = 0
          if (item.url) {
            data.map((it, i) => {
              if (pathname[i] && pathname[i] == it) {
                countC++
              }
            })
            if (countC > countMatch) {
              pathnameCurrent = item.url
              countMatch = countC
            }
          } else {
            item.child.map((it) => {
              const data = it.url.split("/")
              countC = 0
              data.map((it, i) => {
                if (pathname[i] && pathname[i] == it) {
                  countC++
                }
              })
              if (countC > countMatch) {
                pathnameCurrent = it.url
                countMatch =  countC
              }
            })
          }
        })
        let data: any = []; 
        menu.map((item) => { 
          if (!item.role || item.role == employer.info.role){
            item.classParent = "menu-item"
            if (item.url == pathnameCurrent) {
              item.classParent = "menu-item active"
            }
            if (item.child.length > 0) {
              item.child = item.child.map((it) => {
                if(it.url == pathnameCurrent) {
                  it.classParent = "menu-item active"
                  item.classParent = "menu-item active open"
                }
                return it
              })
            }
            data.push(item)
          }
        })
        setMenu(data)
      }
      activeMenu()
    }, [router.pathname])
    function createMenu() {
      return (
        <ul className="menu-inner py-1 ps ps--active-y">
          { menu.map((item: any)=> {
            return (
              <NavItem item={item} key={item.name}/>
            )
          })}
        </ul>
      )
    }
    return <>
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
        <div className="app-brand demo">
          <a href="index.html" className="app-brand-link">
            <span className="app-brand-text demo menu-text fw-bold ms-2">Sneat</span>
          </a>
          <a href="#" className="layout-menu-toggle menu-link text-large ms-auto">
            <i className="bx bx-chevron-left bx-sm align-middle"></i>
          </a>
        </div>
          {createMenu()}
        </aside>
    </>
}

export default Navigate
