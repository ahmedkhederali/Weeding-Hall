import * as yup from 'yup';

const Step1Validations = yup.object().shape({
    firstname: yup.string().required("first name is required").min(1).max(30),
});

export default Step1Validations;