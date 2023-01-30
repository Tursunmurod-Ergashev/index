const userModel = require('../modules/model.user')
class userService {
    async getAllUserService() {
        try {
            const data = await userModel.find({})
            return data;
        } catch (err) {
            return err
        }
    }
    async putUserService(id, newdata) {
        try {
            const data = await userModel.findByIdAndUpdate(id, newdata)
            return data;
        } catch (err) {
            return err
        }
    }
    async postUserService(data) {
        try {
            console.log(data);
            const createData = await userModel.create(data)
            return createData;
        } catch (err) {
            return err
        }
    }
    async getByIdUserService(id) {
        try {
            const data = await userModel.findOne(id)
            return data;
        } catch (err) {
            return err
        }
    }
    async deleteUserService(id) {
        try {
            const data = await userModel.findByIdAndDelete(id)
            return data;
        } catch (err) {
            return err
        }
    }
}
module.exports = new userService()