import React from 'react'
import Logo from './Logo'
import Navbar from './Navbar'
import { Playfair_Display } from '@next/font/google'
type Props = {}
const josefinSans = Playfair_Display({
    weight: '400',
    subsets: ['latin'],
})
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={`${josefinSans.className} frontend-div`}>
            <div className="mask"></div>
            <Logo />
            <Navbar />
            {children}
        </div>
    )
}

export default Layout