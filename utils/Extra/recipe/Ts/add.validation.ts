
import * as yup from "yup";
const validationSchema = yup.object().shape({
    name: yup.string().required("Field is required!"),
    makeTime: yup.number().positive("Make time must be greater than zero").required("Field is required!").nullable(),
    days: yup.array().required("field is required").min(1, "days field must have at least 1 day"),
    mealTime: yup.array().required("field is required").min(1, "Meal time field must have at least 1 value"),
    Instructions: yup.array().of(yup.string().required("Field required")),
    ingredients: yup.array().of(yup.string().required("Field required"))


})

export default validationSchema