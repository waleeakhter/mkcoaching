import { FormikHelpers } from "formik";
import { BaseRouter } from "next/dist/shared/lib/router/router";
import { NextRouter } from "next/router";
import { SyntheticEvent } from "react";
import API from "../../axios";
import { PostType } from "../../Models/Post";

type functionProps = {
    values: PostType, actions: FormikHelpers<PostType>,
    id: string, toastMessage: Function,
    router: NextRouter
}

const onSubmit = ({ values, actions, id, toastMessage, router }: functionProps) => {
    API({ url: "/posts/add", method: id ? 'PATCH' : 'POST', data: values }).then(res => {
        console.log(res.data);
        toastMessage('success', res.data?.post.title, res.data?.message)
        actions.setSubmitting(false);
        id ? router.replace("/admin/posts") : actions.resetForm();


    }).catch(err => {
        console.log("erorrs", err)
        actions.setSubmitting(false)
        toastMessage('error', "Error", "Somthing Went Wrong")
        err.response?.data?.post ? toastMessage('error', err.response?.data?.post.title, err.response.data?.message)
            : null
    })
}
export default onSubmit

export const onCategorySumbit = (e: SyntheticEvent, value: String, toastMessage: Function) => {
    const btn = e.target as HTMLButtonElement;
    btn.disabled = true;
    if (value === null || value === undefined || value === "") {
        toastMessage('error', "Error", "Category name is required");
        btn.disabled = false;
        return
    }
    console.log(value, "value");
    API({ url: "/posts/addcategory", method: 'POST', data: { name: value } }).then(res => {
        console.log(res.data);
        toastMessage('success', res.data?.category.name, res.data?.message)
        btn.disabled = false;
    }).catch(err => {
        console.log("erorrs", err)
        toastMessage('error', "Error", "Somthing Went Wrong")
        toastMessage('error', err.response?.data?.category.name, err.response.data?.message)
        btn.disabled = false;
    })
}