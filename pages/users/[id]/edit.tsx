import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import API from '../../../utils/axios'
import { UserType } from '../../../utils/Models/User'
import AddUser from '../add'

type Props = {}

const EditUser = (props: Props) => {
    const router = useRouter()
    const { id } = router.query
    const [user, setUser] = useState({} as UserType)
    useEffect(() => {
        id && API.get(`/users/list?id=${id}`).then(res => {
            setUser(res.data.at(0))
        })
    }, [id])

    return (
        <AddUser id={id ?? ""} user={user} />
    )
}

export default EditUser
