import { ErrorMessage, Formik, FormikHelpers } from 'formik'
import React, { createRef, MutableRefObject, useRef } from 'react'
import Layout from '../../components/Layout'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import * as yup from "yup";
import API from "./../../utils/axios"
import { Toast, ToastSeverityType } from 'primereact/toast';
import { UserType } from '../../utils/Models/User';
type Props = { user: UserType, id: any }
const AddUser = ({ user, id }: Props) => {
    const toast = useRef<Toast>(null)
    const initialValues: UserType = {
        firstName: "",
        lastName: "",
        email: '',
        password: '',
        paymentStatus: '',
        paymentDate: ''
    }
    const validationSchema = yup.object().shape({
        firstName: yup.string().required("Field is required!"),
        lastName: yup.string().required("Field is required!"),
        email: yup.string().email("Email is not valid").required("Email field is required"),
        password: !id ? yup.string().required("Password field is required") : yup.string(),
        paymentStatus: yup.string().required("Field is required!"),
        paymentDate: yup.string().required("Field is required!")
    })

    const toastMessage = (severity: ToastSeverityType, summary: string, detail: string) => {
        toast.current ?
            toast.current.show({ severity: severity, summary: summary, detail: detail }) : null

    }
    const onSubmit = ({ values, actions }: { values: UserType, actions: FormikHelpers<UserType> }) => {
        API({ url: "/users/add", method: id ? 'PATCH' : 'POST', data: values }).then(res => {
            console.log(res.data);
            toastMessage('success', res.data?.user.firstName, res.data?.message)
            actions.setSubmitting(false)

        }).catch(err => {
            console.log("erorrs", err)
            actions.setSubmitting(false)
            toastMessage('error', "Error", "Somthing Went Wrong")
            toastMessage('error', err.response?.data?.user.email, err.response.data?.message)
        })
    }
    return (
        <Layout>
            <Toast ref={toast} />
            <Formik
                validationSchema={validationSchema}
                initialValues={user ?? initialValues}
                onSubmit={(values, actions) => onSubmit({ values, actions })}
                enableReinitialize={true}
            >
                {({ values, errors, touched, setFieldValue, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <h1 className='text-theme text-3xl'>Add User</h1>
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-5">

                            <div className='flex flex-col'>
                                <label>First Name</label>
                                <InputText name="firstName" type="text" value={values.firstName ?? ""}
                                    placeholder="Enter First Name" autoComplete='off' className="p-inputtext-lg"
                                    onChange={(e) => setFieldValue('firstName', e.target.value)}
                                />
                                <span className='text-pink-300'>
                                    <ErrorMessage name='firstName' />
                                </span>
                            </div>

                            <div className='flex flex-col'>
                                <label>Last Name</label>
                                <InputText name="lastName" type="text" value={values.lastName ?? ""}
                                    placeholder="Enter Last Name" autoComplete='off' className="p-inputtext-lg"
                                    onChange={(e) => setFieldValue('lastName', e.target.value)}
                                />
                                <span className='text-pink-300'>
                                    <ErrorMessage name='lastName' />
                                </span>
                            </div>

                            <div className='flex flex-col'>
                                <label>Email</label>
                                <InputText name="email" type="email" value={values.email ?? ""}
                                    placeholder="Enter Email" autoComplete='new-email' className="p-inputtext-lg"
                                    onChange={(e) => setFieldValue('email', e.target.value)}
                                />
                                <span className='text-pink-300'>
                                    <ErrorMessage name='email' />
                                </span>
                            </div>

                            {!id ? <div className='flex flex-col'>
                                <label>Password</label>
                                <Password name="password" type="password" value={values.password ?? ""} toggleMask
                                    placeholder="Enter Password" autoComplete='new-password' inputClassName="p-inputtext-lg flex-1"
                                    onChange={(e) => setFieldValue('password', e.target.value)}
                                    strongRegex={'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'}
                                />
                                <span className='text-pink-300'>
                                    <ErrorMessage name='password' />
                                </span>
                            </div> : null}

                            <div className='from-group'>
                                <label>Payment Status</label>
                                <Dropdown optionLabel="label" value={values.paymentStatus}
                                    options={[{ value: "paid", label: "Paid" }, { value: "unpaid", label: "Un-Paid" }]}
                                    placeholder="Select..." className="w-full p-inputtext-lg " name="paymentStatus"
                                    onChange={(e) => { setFieldValue('paymentStatus', e.value); }}
                                />
                                <span className='text-pink-300'>
                                    <ErrorMessage name='paymentStatus' />
                                </span>
                            </div>

                            <div className='from-group'>
                                <label>Payment Date</label>
                                <Calendar value={new Date(values.paymentDate)} dateFormat={'dd/mm/yy'}
                                    placeholder="Select..." className="w-full p-inputtext-lg " name="paymentDate"
                                    onChange={(e) => { setFieldValue('paymentDate', e.value); }}
                                    minDate={new Date}
                                />
                                <span className='text-pink-300'>
                                    <ErrorMessage name='paymentDate' />
                                </span>
                            </div>




                        </div>

                        <div className='from-group w-full mt-5'>
                            <Button type='submit' disabled={isSubmitting} loading={isSubmitting}
                                label="Save" icon=" pi pi-arrow-up-right " iconPos='right' />
                        </div>

                        {false && (
                            <div className={'row mt-5'}>
                                <div className={'col-12'}>
                                    <code>
                                        <pre>Values: {JSON.stringify(values, null, 2)}</pre>
                                    </code>
                                </div>
                                <div className={'col-12'}>
                                    <pre>Errors: {JSON.stringify(errors, null, 2)}</pre>
                                </div>
                                <div className={'col-12'}>
                                    <pre>Touched: {JSON.stringify(touched, null, 2)}</pre>
                                </div>
                            </div>
                        )}
                    </form>
                )}
            </Formik>
        </Layout>
    )
}

export default AddUser