import Image from 'next/image'
import React from 'react'
import style from "./mkheader.module.scss"
import SideNav from './SideNav'
type Props = {}

const Siderbar = (props: Props) => {
    return (
        <div className={`${style.Sidebar} shadow-lg backdrop-blur-3xl sticky top-0 ${style.active}`}>
            <div className='logo relative w-28 h-28'>
                <Image src={'/logo.png'} alt={''} fill loading='lazy' />
            </div>
            <SideNav />
        </div>
    )
}

export default Siderbar