import { Schema, models, model } from "mongoose";

export type PostType = { title: string, category: string, url: string, description: string, status?: boolean }

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    url: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        index: true
    },
    status: {
        type: Boolean,
        required: true,
        index: true,
        default: false
    },
})

export default models.post || model("post", postSchema)