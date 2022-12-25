import Image from 'next/image'
import React from 'react'
import style from "./mkheader.module.scss"
import SideNav from './SideNav'
type Props = {}

const Siderbar = (props: Props) => {
    return (
        <div className={`${style.Sidebar} shadow-lg backdrop-blur-3xl sticky top-0 ${style.active}`}>
            <div className='logo relative'>
                <Image src={'/logo.png'} alt={''} width={1000} height={150} />
            </div>
            <SideNav />
        </div>
    )
}

export default Siderbar