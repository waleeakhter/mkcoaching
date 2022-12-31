import { FormikHelpers } from "formik";
import API from "../../../utils/axios";
import { RecipeType } from "../../../utils/Models/Recipe";
type functionProps = {
    values: RecipeType,
    actions: FormikHelpers<RecipeType>,
    toastMessage: Function,
    id: string
}
const onSubmit = ({ values, actions, toastMessage, id }: functionProps) => {
    API({ url: "/recipes/add", method: id ? 'PATCH' : 'POST', data: values }).then(res => {
        console.log(res.data);
        toastMessage('success', res.data?.recipe.name, res.data?.message)
        actions.setSubmitting(false)

    }).catch(err => {
        console.log("erorrs", err)
        actions.setSubmitting(false)
        toastMessage('error', "Error", "Somthing Went Wrong")
        toastMessage('error', err.response?.data?.recipe.name, err.response.data?.message)
    })
}

export default onSubmit