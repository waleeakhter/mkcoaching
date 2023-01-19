import React, { useEffect } from 'react'
import Layout from '../components/Frontend/Layout'
import PostDetail from '../components/Frontend/Post/PostDetail'
import VideoSideBar, { PostProps } from '../components/Frontend/Post/Sidebar'
import API from '../utils/axios'

type Props = {}

const Home = (props: Props & PostProps) => {
  useEffect(() => {

  }, [])
  return (
    <Layout>
      <div className='p-5 xl:p-10 flex gap-5'>
        <VideoSideBar posts={props.posts ?? []} />
        <PostDetail />
      </div>
    </Layout>
  )
}

export default Home
export async function getServerSideProps() {

  return API.get('/posts/list').then(res => {
    let posts = res.data;

    return { props: { posts } }
  })

}