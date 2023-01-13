import * as yup from "yup";
const isValidUrl = (url) => {
    try {
        new URL(url);
    } catch (e) {
        return false;
    }
    return true;
};
const validationSchema = (id: string) => {
    return yup.object().shape({
        title: yup.string().required("Field is required!"),
        description: yup.string().required("Field is required!"),
        category: yup.string().required("Field is required!"),
        url: yup.string().test('is-url-valid', 'URL is not valid', (value) => isValidUrl(value)).required()
    })
}

export default validationSchema