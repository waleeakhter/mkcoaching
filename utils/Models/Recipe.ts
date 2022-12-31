import mongoose from 'mongoose'
export type RecipeType = {
    name: string,
    makeTime: number,
    days: Array<"">,
    mealTime: Object[],
    ingredients: Array<"">,
    Instructions: Array<{ protien: string, carbs: string, fats: string }>,
}

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    makeTime: {
        type: Number,
        required: true,
        index: true
    },
    days: {
        type: [String],
        required: true,
        index: true
    },
    mealTime: {
        type: [String],
        required: true,
        index: true
    },
    ingredients: {
        type: [String],
        required: true,
        index: true
    },
    Instructions: {
        type: Array,
        required: true,
        index: true
    },

})

export default mongoose.models.recipe ?? mongoose.model("recipe", recipeSchema)