const JOI = require('joi')

const createForm = JOI.object({
    longUrl: JOI.string().uri().required(),
    customAlias: JOI.string().optional(),
    topic: JOI.string().optional()
})



class Validator {
    constructor() {}

    async isValidCreateForm(body = {}){
        console.log(body)
        return await createForm.validateAsync(body)
    }
}

module.exports = new Validator();