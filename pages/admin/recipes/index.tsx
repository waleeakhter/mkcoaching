import React from 'react'
import Datatable from '../../../components/Admin/Datatable/Datatable'
import Layout from '../../../components/Admin/Layout'
import API from '../../../utils/axios'
import { RecipeType } from '../../../utils/Models/Recipe'

type Props = { users: Object[] }

const RecipesList = (props: Props) => {
    const columns = [
        { body: (rowData: RecipeType) => <span className='capitalize'>{rowData.name}</span>, header: 'Name', },
        { body: (rowData: RecipeType) => <h4 className='flex items-center gap-1 text-xl'>{rowData.makeTime} <i className='pi pi-clock'></i></h4>, header: 'Make Time', },
        {
            body: (rowData: RecipeType) => <ul className='flex flex-col max-h-20 w-full capitalize overflow-y-auto gap-1 text-xl'>
                {rowData.days.map(day => <li className='text-sm' key={day}>{day}</li>)}</ul>, header: 'Days',
        },
        {
            body: (rowData: RecipeType) => <ul className='flex flex-col max-h-20 w-full capitalize overflow-y-auto gap-1 text-xl'>
                <li className='text-sm'>Protiens: {rowData.protien}</li>
                <li className='text-sm'>Carbs: {rowData.carbs}</li>
                <li className='text-sm'>Fats: {rowData.fats}</li>
            </ul>, header: 'Micronutrients',
        },
        {
            body: (rowData: RecipeType) => <ul className='flex flex-col max-h-20 w-full capitalize overflow-y-auto gap-1 text-xl'>
                {rowData.ingredients.map((ing, index) => <li className='text-sm' key={ing}>{index + 1}. {ing}</li>)}</ul>, header: 'Ingredients',
        },
        {
            body: (rowData: RecipeType) => <ol className=' list-decimal max-h-20 w-full capitalize overflow-y-auto text-xl'>
                {rowData.Instructions.map((ins, index) => <li className='text-sm ' key={ins}>{index + 1}. {ins}</li>)}
            </ol>, header: 'Instructions',
        },
    ]
    return (
        <Layout>
            <Datatable data={props.users ?? []} columns={columns} search={'name'} tableName={'Recipes'} targetRoute={'recipes'} />
        </Layout>
    )
}

export default RecipesList
export async function getServerSideProps() {

    return API.get('/recipes/list').then(res => {
        let users = res.data
        return { props: { users } }
    })

}