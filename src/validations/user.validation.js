const yup = require('yup') 

  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const linkSchema = yup.object({
  body: yup.object({
    last_name: yup.string().url().required(),
    email: yup.string().required().email().required(),
    first_name: yup.string().required(),
    password: yup.string().required(),
    phone: yup.string().matches(phoneRegExp, 'plase this phone number input')
  }),
 
});
const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    return res.status(500).json({ type: err.name, message: err.message });
  }
};
module.exports = validate(linkSchema)
