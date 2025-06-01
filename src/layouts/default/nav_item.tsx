import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'

export interface Item {
    name: string,
    url: "",
    icon: "",
    classData: "",
    classParent: string,
    child: []
}
const NavItem = (props: {item: Item}) => {
    const [item, setItem] = useState(props.item)
    const [itemClass, setItemClass] = useState(props.item.classParent)
    useEffect(()=> {
        setItemClass(item.classParent)
    }, [props.item.classParent])
    const handlerActive = (it: {child: []}) => {
        if (it.child.length > 0) {
            let classN = "menu-item"
            if (itemClass == classN) {
                classN = "menu-item open"
            }
            setItemClass(classN)
        }
    }
    return (<>
            <li className={itemClass} >
                <Link href={ item.child.length ? "#" : item.url} 
                    className={item.classData}
                    onClick={() => { handlerActive(item) }}
                >
                    <i className={item.icon} ></i>
                    <div data-i18n="Analytics">{item.name} </div>
                </Link>
                {item.child.length > 0  && ( 
                    <ul className="menu-sub"> 
                        { item.child.map((it: Item)=>{
                            return <li className={it?.classParent} key={it.url}>
                                <Link href={it?.url} className={it?.classData}>
                                    <i className={it?.icon}></i>
                                    <div data-i18n="Analytics">{it?.name}</div>
                                </Link>
                            </li>
                        })}
                    </ul>
                )}
            </li>
        </>
    )
}
NavItem.defaultProps = {
    item: {
        name: "",
        url: "",
        icon: "",
        classData: "",
        classParent: "",
        child: []
    },
};
export default NavItem