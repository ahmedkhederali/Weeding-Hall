import * as yup from 'yup';

const EditUserPassword = yup.object().shape({
    password: yup.string().required('Password is required').min(5, 'Your password is too short.'),
    confirmpassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
  });

export default EditUserPassword;




