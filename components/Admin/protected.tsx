import React, { PropsWithChildren, useCallback, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
const Protected = ({ children }: PropsWithChildren): JSX.Element => {
    const { status, data } = useSession();
    const route = useRouter()
    const toast = useRef<Toast>(null)
    const redirect = useCallback(() => {
        console.log("first")
        // toast.current?.show({ severity: 'error', summary: "Unauthenticated", detail: "You are not allowed" });
        route.replace("/admin");
    }, [route])
    useEffect(() => {
        console.log(status)
        status === "unauthenticated" ? redirect() : null;
    }, [status, redirect])

    {
        if (status === "authenticated") {
            return <>
                {children}
            </>
        }
    }
    // {
    //     if (status === "unauthenticated") {
    //         return <>
    //             <Toast ref={toast} />
    //         </>
    //     }

    // }
    return <div className=' h-screen flex items-center justify-center'>
        <div className=' text-white '>
            <ProgressSpinner />
        </div>
    </div>

}

export default Protected