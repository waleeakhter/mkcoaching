import React from 'react'
import Datatable from '../../../components/Admin/Datatable/Datatable'
import Layout from '../../../components/Admin/Layout'
import API from '../../../utils/axios'
import { PostType } from '../../../utils/Models/Post'

type Props = { posts: Object[] }

const VideosList = (props: Props) => {
    const columns = [
        { body: (rowData: PostType) => rowData.title, header: 'Title', },
        {
            body: (rowData: PostType) =>
                <iframe height={80} className="w-full" src={rowData.url}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation' />,
            header: 'Video',
        },
        { field: 'category.name', header: 'Category', },
    ]
    return (
        <Layout>
            <Datatable data={props.posts ?? []} columns={columns} search={'title'} tableName={'Posts'} targetRoute={'posts'} />
        </Layout>
    )
}

export default VideosList
export async function getServerSideProps() {

    return API.get('/posts/list').then(res => {
        let posts = res.data
        return { props: { posts } }
    })

}