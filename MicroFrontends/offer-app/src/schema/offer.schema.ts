import * as Yup from "yup";

const addUpdateOfferSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required(),
  price: Yup.number().required(),
});

const initialValues = {
    title: '',
    description: '',
    price: '',
}
export {
  addUpdateOfferSchema, initialValues
}