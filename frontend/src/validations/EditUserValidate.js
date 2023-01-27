import * as yup from 'yup';

const EditUserValidations = yup.object().shape({
    email: yup.string().required("Email is required").email(),
    firstname: yup.string().required("First name is required").min(5).max(20),
    lastname: yup.string().required("Last name is required").min(3),
    phone: yup.number().typeError("phone number must be valid").required(),

});

export default EditUserValidations;