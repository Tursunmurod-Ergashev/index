const userService = require('../services/user.services')
const jwt = require('jsonwebtoken');
const {ValidationError} = require('yup');
const {registerUserSchema} = require('../validations/user.validation')
const secret_key = process.env.TOKEN_SECRET;
class userController {
    async getAllUserController(req, res) {
        try {
            const data = await userService.getAllUserService();
            return res.json(data)
        } catch (er) { 
            return res.json(er)
        }
    }
    async postUserController(req, res) {
        try {
            const { body } = req;
            const data = registerUserSchema.validateSync(body, { abortEarly: false, stripUnknown: true })

            

            // const data = await userService.postUserService({ last_name, password, phone, first_name, email });
            return res.json(data)
        } catch (er) { 
            const error =  ValidationError;
             return res.json(error)
        }
    }
    async getByIdUserController(req, res) {
        try {
            const { id } = req.params
            const data = await userService.getByIdUserService(id);
            return res.json(data)
        } catch (er) { 
             return res.json(er)
        }
    }
    async putUserController(req, res) {
        try {
            const { id } = req.params
            const newdata = req.body;
            const data = await userService.putUserService(id, newdata);
            return res.json(data)
        } catch (er) {
             return res.json(er)
         }
    }
    async deleteUserController(req, res) {
        try {
            const { id } = req.params
            const data = await userService.deleteUserService(id);
            return res.json(data)
        } catch (er) { 
             return res.json(er)
        }
    }
    async login(req, res) {
        try {
            const { phone, password } = req.body;
            console.log(req.body);
            if(!phone && !password) return res.status(400).json('password and phone required ')
            const userCheck = await userService.getByIdUserService({ phone });
            if (!userCheck.phone) return res.json({ message: 'user not found' })
            const token = jwt.sign({user_id: userCheck._id}, secret_key, {expiresIn: '24h'})
            return res.status(200).json({
                token,
                userCheck
            })
        } catch (er) { 
             return res.json({
                masseage: 'user not found or user regisitions not',
                er
             })
        }
    }
}
module.exports = new userController()
