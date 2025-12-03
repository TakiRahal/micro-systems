import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  username: Yup.string().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
});

const initialValues = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
}
export {
  registerSchema, initialValues
}