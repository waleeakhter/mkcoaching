import Image from 'next/legacy/image'
import React from 'react'

type Props = {}

const Logo = (props: Props) => {
    return (
        <div className='relative overflow-hidden mx-auto h-20 max-w-[260px] '>
            <Image layout='fill' src={"/logo.png"} alt="logo" className='' />
        </div>
    )
}

export default Logo