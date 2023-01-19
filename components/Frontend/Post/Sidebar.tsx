import { Card } from 'primereact/card'
import React, { useState } from 'react'
import { PostType } from '../../../utils/Models/Post'
import { Accordion, AccordionTab } from 'primereact/accordion';
import Link from 'next/link';
export type PostProps = { posts: Array<PostType & { category: { name: string }, _id: string }> }

const VideoSideBar = ({ posts }: PostProps) => {
    const [activeIndex, setActiveIndex] = useState(0)
    return (
        <Card className=' bg-slate-50/20 max-w-xs w-full '>
            <Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                {posts.map(post =>
                    <AccordionTab header={post.category.name} key={post.title}>
                        <span className=' cursor-pointer '>{post.title}</span>
                    </AccordionTab>
                )}
            </Accordion>
        </Card>
    )
}

export default VideoSideBar