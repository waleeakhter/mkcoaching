import React from 'react'
import Datatable from '../../components/Datatable/Datatable'
import Layout from '../../components/Layout'
import API from '../../utils/axios'
import { UserType } from '../../utils/Models/User'

type Props = { users: Object[] }

const UsersList = (props: Props) => {
    const columns = [
        { body: (rowData: UserType) => rowData.firstName + " " + rowData.lastName, header: 'Total Amount', },
        { field: 'email', header: 'Email' },
        { field: 'paymentStatus', header: 'Payment Status', },
        { field: (rowData: UserType) => new Date(rowData.paymentDate).toLocaleString(), header: 'Payment Date', },
    ]
    return (
        <Layout>
            <Datatable data={props.users ?? []} columns={columns} search={'firstName'} tableName={'Users'} targetRoute={'users'} />
        </Layout>
    )
}

export default UsersList
export async function getServerSideProps() {

    return API.get('/users/list').then(res => {
        let users = res.data
        return { props: { users } }
    })

}