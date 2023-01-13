import Link from 'next/link'
import React from 'react'

type Props = {}
type link = { name: string, icon: string, link: string }
const SideNav = (props: Props) => {
    const navLinks = [
        {
            name: "Dashboard",
            icon: "pi pi-box",
            link: "/admin/dashboard"
        },
        {
            name: "Users",
            icon: "pi pi-user",
            link: "/admin/users"
        },
        {
            name: "Recipes",
            icon: "pi pi-apple",
            link: "/admin/recipes"
        },
        {
            name: "Posts",
            icon: "pi pi-camera",
            link: "/admin/posts"
        }

    ]
    return (
        <div className=' border-t pt-5'>
            <ul className='p-4 flex flex-col gap-4'>
                {
                    navLinks.map(({ name, icon, link }: link) => (
                        <li key={name} >

                            <Link href={link} className="flex text-lg   gap-4 items-center ">
                                <span className={icon}></span>{name}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SideNav