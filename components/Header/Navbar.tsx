import Image from 'next/image'
import { Button } from 'primereact/button'
import React, { MutableRefObject, useRef } from 'react'
import { Menu } from 'primereact/menu';
import style from "./mkheader.module.scss"
type Props = { setActive: Function }

const Navbar = ({ setActive }: Props) => {
    const menu: any = useRef(null);
    let items = [
        { label: 'Settings', icon: 'pi pi-fw pi-plus' },
        { label: 'Logout', icon: 'pi pi-fw pi-trash' }
    ];
    const toggleHandler = () => {
        setActive((prev: boolean) => prev = !prev)
    }
    return (
        <div className='flex justify-between'>
            <Button icon="pi pi-bars" onClick={toggleHandler} />
            <Image src={'/logo.png'} alt={''} className={style.navLogo} fill loading='lazy' />
            <Menu model={items} popup ref={menu} id="popup_menu" />
            <Button label="Admin" icon="pi pi-user" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" />
        </div>
    )
}

export default Navbar