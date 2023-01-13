import * as yup from "yup";

const validationSchema = (id: string) => {
    return yup.object().shape({
        firstName: yup.string().required("Field is required!"),
        lastName: yup.string().required("Field is required!"),
        email: yup.string().email("Email is not valid").required("Email field is required"),
        password: !id ? yup.string().required("Password field is required") : yup.string(),
        paymentStatus: yup.string().required("Field is required!"),
        paymentDate: yup.string().required("Field is required!")
    })
}

export default validationSchema