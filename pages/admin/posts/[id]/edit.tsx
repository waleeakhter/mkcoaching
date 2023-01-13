import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import API from '../../../../utils/axios'
import { PostType } from '../../../../utils/Models/Post'
import AddPost from '../add'

type Props = {}

const EditUser = (props: Props) => {
    const router = useRouter()
    const { id } = router.query
    const [post, setPost] = useState({} as PostType)
    useEffect(() => {
        id && API.get(`/posts/list?id=${id}`).then(res => {
            const post = res.data.at(0)
            setPost({ ...post, category: post._id })
        })
    }, [id])

    return (
        <AddPost id={id ?? ""} post={post ?? {}} />
    )
}

export default EditUser
