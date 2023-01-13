import mongoose from 'mongoose'
export type categoryType = { name: string }

const postCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
})

export default mongoose.models.postcategory || mongoose.model("postcategory", postCategorySchema)