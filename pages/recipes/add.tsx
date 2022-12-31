import { ErrorMessage, FieldArray, Formik, FormikHelpers } from 'formik'
import React, { useRef, useState } from 'react'
import Layout from '../../components/Layout'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button'; import { MultiSelect } from 'primereact/multiselect';
import { Toast, ToastSeverityType } from 'primereact/toast';
import { RecipeType } from '../../utils/Models/Recipe';
import initialValues, { days, mealTime } from '../../utils/Extra/recipe/Ts/add.values';
import onSubmit from '../../utils/Extra/recipe/Ts/add.functions';
import { InputNumber } from 'primereact/inputnumber';
import validationSchema from '../../utils/Extra/recipe/Ts/add.validation';


type Props = { recipe: RecipeType, id: any }
const AddRecipe = ({ recipe, id }: Props) => {
    const toast = useRef<Toast>(null)
    const [debug] = useState(false)
    const toastMessage = (severity: ToastSeverityType, summary: string, detail: string) => {
        toast.current ?
            toast.current.show({ severity: severity, summary: summary, detail: detail }) : null
    }

    return (
        <Layout>
            <Toast ref={toast} />
            <Formik
                validationSchema={validationSchema}
                initialValues={recipe ?? initialValues}
                onSubmit={(values, actions) => onSubmit({ values, actions, toastMessage, id })}
                enableReinitialize={true}
            >
                {({ values, errors, touched, setFieldValue, handleSubmit, isSubmitting }) => (
                    <form onSubmit={handleSubmit}>
                        <h1 className='text-theme text-3xl'>Add Recipe</h1>
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-5">

                            <div className='flex flex-col'>
                                <label>Name</label>
                                <InputText name="name" type="text" value={values.name ?? ""}
                                    placeholder="Enter Recipe Name" autoComplete='off' className="p-inputtext-lg"
                                    onChange={(e) => setFieldValue('name', e.target.value)}
                                />
                                <span className='text-pink-300'>
                                    <ErrorMessage name='name' />
                                </span>
                            </div>

                            <div className='from-group'>
                                <label>Make Time</label>
                                <InputNumber value={values.makeTime}
                                    placeholder="Enter make time" className="w-full p-inputtext-lg " name="makeTime"
                                    onChange={(e) => { setFieldValue('makeTime', e.value); }} min={0}
                                />
                                <span className='text-pink-300'>
                                    <ErrorMessage name='makeTime' />
                                </span>
                            </div>

                            <div className='flex flex-col'>
                                <label>Days</label>
                                <MultiSelect name="days" value={values.days ?? []}
                                    placeholder="Select Days" multiple options={days} optionLabel={'label'} optionValue={'value'}
                                    className="h-[49px] flex items-center"
                                    onChange={(e) => setFieldValue('days', e.target.value ?? [])} filter showClear
                                />
                                <span className='text-pink-300'>
                                    <ErrorMessage name='days' />
                                </span>
                            </div>
                            <div className='flex flex-col'>
                                <label>Meal Time</label>
                                <MultiSelect name="mealTime" value={values.mealTime ?? []}
                                    placeholder="Select Time" multiple options={mealTime} optionLabel={'label'} optionValue={'value'}
                                    className="h-[49px] flex items-center"
                                    onChange={(e) => setFieldValue('mealTime', e.target.value ?? [])} filter showClear
                                />
                                <span className='text-pink-300'>
                                    <ErrorMessage name='mealTime' />
                                </span>
                            </div>
                        </div>



                        <div className='flex flex-col mt-4'>
                            <label htmlFor="Instructions">Instructions</label>
                            <FieldArray name="Instructions"
                                render={arrayHelpers => (
                                    <div className='mt-6'>
                                        {(
                                            values.Instructions?.map((ins, index) => (
                                                <div key={index} className="flex mb-7 gap-4">
                                                    <div className='flex flex-wrap items-baseline gap-y-7'>
                                                        <div>
                                                            <div className='p-float-label'>
                                                                <InputText autoComplete='off' id={`Instructions.${index}.protien`} value={values.Instructions[index].protien}
                                                                    name={`Instructions.${index}.protien`} className={' p-inputtext-lg '}
                                                                    onChange={(e) => setFieldValue(`Instructions.${index}.protien`, e.target.value)} />
                                                                <label className='block' htmlFor={`Instructions.${index}.protien`}>Portien</label>
                                                            </div>
                                                            <span className='text-pink-300 block'>
                                                                <ErrorMessage name={`Instructions.${index}.protien`} />
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <div className='p-float-label'>
                                                                <InputText autoComplete='off' name={`Instructions.${index}.carbs`} value={values.Instructions[index].carbs}
                                                                    className={' p-inputtext-lg '} onChange={(e) => setFieldValue(`Instructions.${index}.carbs`, e.target.value)} />
                                                                <label className='block'>Carbs</label>
                                                            </div>
                                                            <span className='text-pink-300 block'>
                                                                <ErrorMessage name={`Instructions.${index}.carbs`} />
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <div className='p-float-label'>
                                                                <InputText autoComplete='off' name={`Instructions.${index}.fats`} value={values.Instructions[index].fats}
                                                                    className={' p-inputtext-lg '} onChange={(e) => setFieldValue(`Instructions.${index}.fats`, e.target.value)} />
                                                                <label className='block'>Fats</label>
                                                            </div>
                                                            <span className='text-pink-300 block'>
                                                                <ErrorMessage name={`Instructions.${index}.fats`} />
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className='p-buttonset'>
                                                        {values.Instructions.length > 1 ? <Button
                                                            type="button"
                                                            icon="pi pi-times"
                                                            onClick={() => arrayHelpers.remove(index)}
                                                        /> : null}
                                                        {index === 0 && <Button
                                                            className='w-20'
                                                            type="button"
                                                            icon="pi pi-plus"
                                                            onClick={() => arrayHelpers.insert(index, { protien: "", carbs: "", fats: "" })}
                                                        />}
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            />
                            <span className='text-pink-300'>
                                <ErrorMessage name='lastName' />
                            </span>
                        </div>

                        <div className='flex flex-col mt-2'>
                            <label htmlFor="ingredients">Ingredients</label>
                            <FieldArray name="ingredients"
                                render={arrayHelpers => (
                                    <div className='mt-6'>
                                        {(
                                            values.ingredients?.map((ing, index) => (
                                                <div key={index} className="flex mb-8 gap-4">
                                                    <div className='flex flex-wrap flex-col items-baseline gap-y-4'>
                                                        <div className='p-float-label'>
                                                            <InputText id={`ingredients.${index}`} value={ing ?? ""}
                                                                name={`ingredients.${index}`} className={' p-inputtext-lg '}
                                                                onChange={(e) => setFieldValue(`ingredients.${index}`, e.target.value)} />
                                                            <label className='block' htmlFor={`ingredients.${index}`}>Ingredient {index + 1}</label>
                                                        </div>
                                                        <span className='text-pink-300 block'>
                                                            <ErrorMessage name={`ingredients.${index}`} />
                                                        </span>
                                                    </div>

                                                    <div className='p-buttonset'>
                                                        {values.ingredients.length > 1 ? <Button
                                                            type="button"
                                                            icon="pi pi-times"
                                                            onClick={() => arrayHelpers.remove(index)}
                                                        /> : null}
                                                        {index === 0 && <Button
                                                            className='w-20'
                                                            type="button"
                                                            icon="pi pi-plus"
                                                            onClick={() => arrayHelpers.insert(index, "")}
                                                        />}
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                )}
                            />

                        </div>

                        <div className='from-group w-full mt-5'>
                            <Button type='submit' disabled={isSubmitting} loading={isSubmitting}
                                label="Save" icon=" pi pi-arrow-up-right " iconPos='right' />
                        </div>

                        {debug && (
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

export default AddRecipe