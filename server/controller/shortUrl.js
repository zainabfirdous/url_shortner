const {createUrl} = require('../service/url')

const createShortUrl = async(req, res)=>{
    try{
        const url = await createUrl(req);
        return url;
    }catch(err){
    return err
}}

module.exports = {createShortUrl}