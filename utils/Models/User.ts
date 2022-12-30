import mongoose from 'mongoose'
export type UserType = { firstName: string, lastName: string, email: string, password: string, paymentStatus: string, paymentDate: string }

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        index: true
    },
    lastName: {
        type: String,
        required: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        index: true
    },
    paymentStatus: {
        type: String,
        required: true,
        index: true
    },
    paymentDate: {
        type: Date,
        required: true,
        index: true
    },
    token: {
        type: String
    }
})

export default mongoose.models.user || mongoose.model("user", userSchema)