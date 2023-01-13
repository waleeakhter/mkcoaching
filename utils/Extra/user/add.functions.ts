import { FormikHelpers } from "formik";
import API from "../../axios";
import { UserType } from "../../Models/User";

type functionProps = {
    values: UserType, actions: FormikHelpers<UserType>,
    id: string, toastMessage: Function
}

const onSubmit = ({ values, actions, id, toastMessage }: functionProps) => {
    API({ url: "/users/add", method: id ? 'PATCH' : 'POST', data: values }).then(res => {
        console.log(res.data);
        toastMessage('success', res.data?.user.firstName, res.data?.message)
        actions.setSubmitting(false);
        !id && actions.resetForm()

    }).catch(err => {
        console.log("erorrs", err)
        actions.setSubmitting(false)
        toastMessage('error', "Error", "Somthing Went Wrong")
        toastMessage('error', err.response?.data?.user.email, err.response.data?.message)
    })
}
export default onSubmit