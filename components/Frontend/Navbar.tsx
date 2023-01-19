import Link from 'next/link'
import React from 'react'

type Props = {}

const Navbar = (props: Props) => {
    return (
        <div className='h-20 from-pink-800/80  bg-gradient-to-r 
        flex items-center justify-center w-full shadow-lg p-1 backdrop-blur-[3px] mt-2 gap-4 text-[1.5rem]'>
            <Link href={'/'} className="block">Videos</Link>
            <Link href={'/'} className="block">User Information</Link>
        </div>
    )
}

export default Navbar