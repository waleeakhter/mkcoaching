import React from 'react'
import Layout from '../../components/Layout'
import API from '../../utils/axios'
import { Card } from 'primereact/card';
type Props = { users: Object[] }

const Dashboard = ({ users }: Props) => {
    return (
        <Layout>
            <div className=' grid grid-cols-3 '>
                <Card className=' bg-slate-100/30 '>
                    <i className='pi pi-users text-5xl'></i>
                    <div className='flex justify-between gap-4 items-center font-bold  text-xl'>
                        <h1>Total Users</h1>
                        <span>{users?.length ?? 0}</span>
                    </div>
                </Card>
            </div>
        </Layout>
    )
}

export default Dashboard
export async function getServerSideProps() {

    return API.get('/users/list').then(res => {
        let users = res.data
        return { props: { users } }
    })

}