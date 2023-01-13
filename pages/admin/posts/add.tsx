import { ErrorMessage, Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import Layout from '../../../components/Admin/Layout'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast, ToastSeverityType } from 'primereact/toast';
import { PostType } from '../../..//utils/Models/Post';
import onSubmit, { onCategorySumbit } from '../../../utils/Extra/posts/add.functions';
import validationSchema from '../../../utils/Extra/posts/add.validation';
import initialValues from '../../../utils/Extra/posts/add.values';
import API from '../../../utils/axios';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from 'primereact/divider';
import { useRouter } from 'next/router';

type Props = { post: PostType, id: any, categories?: [] }

const AddPost = ({ post, id }: Props) => {
    const toast = useRef<Toast>(null)
    const [category, setCategory] = useState("")
    const [categories, setCategories] = useState([] as Array<{ _id: string, name: "" }>)
    const router = useRouter()
    const toastMessage = (severity: ToastSeverityType, summary: string, detail: string) => {
        toast.current ?
            toast.current.show({ severity: severity, summary: summary, detail: detail }) : null

    }
    useEffect(() => {
        API.get('/posts/categorylist').then(res => {
            let categories = res.data
            setCategories(categories)
        })
    }, [])

    return (
        <Layout>
            <Toast ref={toast} />
            {!id ?
                <>
                    <h1 className='text-theme text-3xl'>Add Post Category</h1>
                    <div className='flex flex-col mt-3 '>
                        <label>Category Name</label>
                        <InputText name="name" type="text" value={category ?? ""}
                            placeholder="Enter Category Name" autoComplete='off' className="p-inputtext-lg max-w-md"
                            onChange={(e) => setCategory(e.target.value ?? "")}
                        />
                        <Button label='Save' className='mt-4 max-w-fit' loading={false}
                            icon="pi pi-arrow-up-right " iconPos='right' onClick={(e) => onCategorySumbit(e, category, toastMessage)} />
                    </div>
                    <div className='my-8'>
                        <Divider type="dashed" className=' before:border-[#fff_!important]' />
                    </div>
                </>
                : null}
            <Formik
                validationSchema={validationSchema(id)}
                initialValues={post ?? initialValues}
                onSubmit={(values, actions) => onSubmit({ values, actions, id, toastMessage, router })}
                enableReinitialize={true}
            >
                {({ values, errors, touched, setFieldValue, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>


                        <h1 className='text-theme text-3xl mb-3'>{id ? "Edit" : "Add"} Post</h1>
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">

                            <div className=' space-y-4 h-full'>
                                <div className='flex flex-col'>
                                    <label>Post Name</label>
                                    <InputText name="title" type="text" value={values.title ?? ""}
                                        placeholder="Enter Title of Post" autoComplete='off' className="p-inputtext-lg"
                                        onChange={(e) => setFieldValue('title', e.target.value)}
                                    />
                                    <span className='text-pink-300'>
                                        <ErrorMessage name='title' />
                                    </span>
                                </div>

                                <div className='flex flex-col'>
                                    <label>Short Description</label>
                                    <InputTextarea name="description" value={values.description ?? ""}
                                        placeholder="Enter short description" autoComplete='off' className=" h-full"
                                        onChange={(e) => setFieldValue('description', e.target.value)} rows={6}
                                    />
                                    <span className='text-pink-300'>
                                        <ErrorMessage name='description' />
                                    </span>
                                </div>
                            </div>

                            <div className=' space-y-4 h-full'>
                                <div className='from-group'>
                                    <label>Category</label>
                                    <Dropdown optionLabel="label" value={values.category} multiple={false}
                                        options={categories ? categories.map((c: { name: string, _id: string }) => {
                                            return { label: c.name, value: c._id }
                                        }) : []}
                                        placeholder="Select..." className="h-[49px] flex items-center" name="category"
                                        onChange={(e) => { setFieldValue('category', e.value); }} showClear={true} filter
                                    />
                                    <span className='text-pink-300'>
                                        <ErrorMessage name='category' />
                                    </span>
                                </div>

                                <div className='from-group flex flex-col'>
                                    <label>Video URL</label>
                                    <InputText value={values.url}
                                        placeholder="Enter Video URL" className="p-inputtext-lg" name="url"
                                        onChange={(e) => { setFieldValue('url', e.target.value ?? ""); }}
                                    />
                                    <span className='text-pink-300 block'>
                                        <ErrorMessage name='url' />
                                    </span>
                                    {
                                        values.url ?
                                            <div className='p-0 shadow-lg overflow-hidden'>
                                                <iframe className='w-full'
                                                    frameBorder={0}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                    sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                                                    src={values.url}>
                                                </iframe>
                                            </div> : null
                                    }
                                </div>
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

export default AddPost

