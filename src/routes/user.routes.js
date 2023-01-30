const express = require('express');
const routes = express.Router()
const yup = require('yup') 
//   const PASSWORD_REGEX = /^[a-zA-Z0-9]{8,}$/;
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
//    const registerUserSchema = yup
//     .object({
//       // last_name: yup.string().optional().trim(),
//       // email: ,
//       // first_name: yup.string().trim().min(2).max(50),
//       // password: yup.string().matches(PASSWORD_REGEX, 'password must contain only letters and numbers with a minimum of 8 characters'),
//       // phone: yup.string().matches(phoneRegExp, 'plase this phone number input')
//     })
//     .required();
//     module.exports = registerUserSchema
const linkSchema = yup.object({
  body: yup.object({
    last_name: yup.string().required(),
    email: yup.string().required().email().required(),
    first_name: yup.string().required(),
    password: yup.string().required(),
    phone: yup.string().required()
  }),
  // params: yup.object({
  //   id: yup.number().required(),
  // }),
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
const vertiyToken = require('../middlewares/user.middleware')
const userController = require('../controllers/user.controller');
routes.get('/user',vertiyToken,userController.getAllUserController)
routes.post('/user',validate(linkSchema), userController.postUserController);
routes.get('/user/:id', userController.getByIdUserController);
routes.put('/user/:id', userController.putUserController)
routes.delete('/user/:id', userController.deleteUserController)
routes.post('/login', userController.login)
module.exports = routes;