
import { RecipeType } from './../../../Models/Recipe';
const initialValues: RecipeType = {
    name: "",
    makeTime: 0,
    days: [],
    mealTime: [],
    ingredients: [""],
    protien: "",
    carbs: "",
    fats: "",
    Instructions: [""],
}

export default initialValues

export const days = [
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
    { label: "Sunday", value: "sunday" },


]

export const mealTime = [
    { label: "Breakfast", value: "breakfast" },
    { label: "1st Snack", value: "1stsnack" },
    { label: "Lunch", value: "lunch" },
    { label: "Dinner", value: "dinner" },
]