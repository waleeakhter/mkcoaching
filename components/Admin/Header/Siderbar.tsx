import Image from 'next/legacy/image'
import React from 'react'
import style from "./mkheader.module.scss"
import SideNav from './SideNav'
type Props = {}

const Siderbar = (props: Props) => {
    return (
        <div className={`${style.Sidebar} shadow-lg backdrop-blur-3xl sticky top-0 ${style.active}`}>
            <div className='logo relative w-full h-[4.5rem]'>
                <Image src={'/logo.png'} alt={'logo'} layout={'fill'} loading={'eager'} />
            </div>
            <SideNav />
        </div>
    )
}

export default Siderbar