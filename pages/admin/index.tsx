import type { NextPage } from 'next'
import Head from 'next/head'
import { useSession } from "next-auth/react"
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import { signIn } from 'next-auth/react'
import React, { FormEventHandler } from 'react';
import Router from 'next/router';
import { ProgressSpinner } from 'primereact/progressspinner';
const AdminLogin: NextPage = () => {
  const { data: session, status } = useSession()
  const [credentials, setCredentials] = React.useState({
    email: "", password: ""
  })
  const [submiting, setSubmiting] = React.useState(false)
  const [errors, setErrors] = React.useState({ email: "", password: "" })


  const redirect = () => {
    Router.replace("/admin/dashboard");
  }
  React.useEffect(() => {
    status === "authenticated" ? redirect() : null;
  }, [status])


  const handleSubmit: FormEventHandler<HTMLButtonElement> = async (e) => {
    const { email, password } = credentials;
    if (email === "") { setErrors(prev => prev = { ...prev, email: "Email is requried" }); return true };
    if (password === "") { setErrors(prev => prev = { ...prev, password: "Password is requried" }); return true; }
    setSubmiting(true);
    signIn("credentials", { ...credentials, redirect: false }).then(res => {
      console.log(res);
      setSubmiting(false);
      res?.ok ? Router.replace('/admin/dashboard') : null;
    }).catch(err => {
      console.log(err);
      setSubmiting(false);
    })


  }
  return (

    status === "unauthenticated" ?
      <div className={'h-screen p-4 flex justify-center  items-center bg-cover bg-center backdrop-blur-2xl '} style={{ backgroundImage: "url(/login-bg.jpg)" }}>
        <Head>
          <title>Login</title>
          <meta name="description" content="JK trading Mobile lcds" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Card className=' max-w-prose w-full p-4 text-center bg-pink-300/5 backdrop-blur-md '>
          <h1 className='text-4xl capitalize text-green'>Login</h1>
          <h6 className='capitalize text-white'>Welcome to MK Coaching</h6>

          <div className=' space-y-4 mt-4'>

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-envelope"></i>
              </span>
              <InputText placeholder="Enter email address" type={'email'} value={credentials.email} autoComplete="off"
                onChange={(e) => setCredentials((prev => prev = { ...prev, email: e.target.value ?? "" }))} />
            </div>
            <div className=' text-white '>
              {errors.email}
            </div>

            <div className="p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-key"></i>
              </span>
              <Password placeholder="Enter Password" toggleMask value={credentials.password} panelClassName="hidden"
                onChange={(e) => setCredentials((prev => prev = { ...prev, password: e.target.value ?? "" }))} autoComplete="new-password" />
            </div>
            <div className=' text-white '>
              {errors.password}
            </div>
          </div>

          <Divider className='my-8  ' />
          <Button label="Login" icon=" pi pi-arrow-up-right " iconPos='right'
            onClick={(e) => handleSubmit(e)} loading={submiting} disabled={submiting} />
        </Card>
      </div> :
      <div className=' h-screen flex items-center justify-center'>
        <div className=' text-white '>
          <ProgressSpinner />
        </div>
      </div>

  )
}

export default AdminLogin


