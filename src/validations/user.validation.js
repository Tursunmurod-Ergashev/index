const yup = require('yup') 
  const PASSWORD_REGEX = /^[a-zA-Z0-9]{8,}$/;
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  export const registerUserSchema = yup
    .object({
      last_name: yup.string().optional().trim(),
      email: yup.string().required().email(),
      first_name: yup.string().trim().min(2).max(50),
      password: yup.string().matches(PASSWORD_REGEX, 'password must contain only letters and numbers with a minimum of 8 characters'),
      phone: yup.phone().matches(phoneRegExp, 'plase this phone number input')
    })
    .required();