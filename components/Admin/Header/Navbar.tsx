import Image from "next/legacy/image";
import { Button } from 'primereact/button'
import React, { MutableRefObject, useRef } from 'react'
import { Menu } from 'primereact/menu';
import style from "./mkheader.module.scss"
import { signOut } from 'next-auth/react'
type Props = { setActive: Function }

const Navbar = ({ setActive }: Props) => {
    const menu: any = useRef(null);
    let items = [
        { label: 'Settings', icon: 'pi pi-fw pi-plus' },
        { label: 'Logout', icon: 'pi pi-fw pi-trash', command: () => signOut() }
    ];
    const toggleHandler = () => {
        setActive((prev: boolean) => prev = !prev)
    }
    return (
        <div className='flex justify-between items-center'>
            <Button icon="pi pi-bars" onClick={toggleHandler} />
            <div className="relative w-full max-w-[15rem] h-14 ">
                <Image src={'/logo.png'} alt={'logo'} className={style.navLogo} loading='lazy' layout="fill" />
            </div>
            <Menu model={items} popup ref={menu} id="popup_menu" />
            <Button label="Admin" icon="pi pi-user" onClick={(event) => menu.current.toggle(event)} aria-controls="popup_menu" />
        </div>
    )
}

export default Navbar