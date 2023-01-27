import * as yup from 'yup';

const RegisterValidations = yup.object().shape({
    firstname: yup.string().required("first name is required").min(1).max(30),
    lastname: yup.string().required("last name is required").min(1).max(30),
    email: yup.string().required().email(),
    password: yup.string().required().min(5).max(20),
    phone: yup.number().typeError("phone number must be valid").required(),
    terms: yup.boolean().oneOf([true]).required(),
    firstnamear: yup.string().required("first name Arabic is required").min(1).max(30),
    lastnamear: yup.string().required("last name in Arabic is required").min(1).max(30),
});

export default RegisterValidations;