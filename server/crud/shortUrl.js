const {shortUrl} = require('../models/url')

const findOne = async(cond) =>{
    try{
        const result = await shortUrl.findOne({where: cond})
        return result
    }catch(err){
        console.log(err)
        return err
    }
}

const create = async(record) =>{
    try{
        const result = await shortUrl.create(record)
        return result

    }catch(Err){
        console.log(Err)
        return err
    }
}

module.exports = {
    findOne,
    create
}