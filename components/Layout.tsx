import { Raleway } from '@next/font/google'
import React, { useEffect, useState } from 'react'
import Navbar from './Header/Navbar'
import Siderbar from './Header/Siderbar'
import style from "./Header/mkheader.module.scss"
type Props = {}
const josefinSans = Raleway({
    weight: '500',
    subsets: ['latin'],
})
const Layout = ({ children }: { children: React.ReactNode }) => {
    const [active, setActive] = useState(true)
    useEffect(() => {
        console.log("check render")
    }, [])
    return (
        <div className={`${josefinSans.className} flex ${style.mainWrapper} ${active ? style.active : ""}`}>
            <Siderbar />
            <div className='content-wrapper flex-1 transition-all overflow-hidden'>
                <header className='shadow-lg p-4  sticky top-0 z-10 bg-inherit'>
                    <Navbar setActive={setActive} />
                </header>
                <main className='p-5 z-0 '>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout