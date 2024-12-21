const validator = require('./helper/validator');

module.exports = (type = "") => {
    return async(req, res, next) => {
        const set_validator = {
            createForm: async(req)=>{
                console.log(req.body)
                await validator.isValidCreateForm(req.body)
            }
        }

        try{
            await set_validator[type](req);
            next()
        }catch(err){
            const error = new Error(err)
            error.status = 400
            return next(error)
        }
    }
}