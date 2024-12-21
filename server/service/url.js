const {shortUrl} = require('../models/url')
const {nanoid} = require('nanoid')
const {BASE_URL} = require('../constant')
const {findOne, create} = require('../crud/shortUrl')
const { redis } = require('../config/redis_config')

const createUrl = async(req) => {
    try{
        const{
            longUrl,
            customAlias = "",
            topic = ""
        } = req.body;
        const cachedData = await redis.get(longUrl)
        if(cachedData){
            const cacheResult = JSON.parse(cachedData)
            return `${BASE_URL}/${cacheResult.alias}`
        } else{
        const existingUrl = await findOne({originalUrl: longUrl})
       
        let shortUrlRecord = {}
   
        if(!existingUrl){
            const id = nanoid(8)
            const shortId = customAlias?.length ? customAlias : id

            shortUrlRecord = await create({
                originalUrl: longUrl,
                alias: shortId,
                topic: topic
            })

            redis.set(longUrl, JSON.stringify(shortUrlRecord.dataValues), 'EX', 3600)
            return `${BASE_URL}/${shortId}`
        }else{
            redis.set(longUrl, JSON.stringify(existingUrl.dataValues), 'EX', 3600)
            return `${BASE_URL}/${existingUrl.dataValues.alias}`
        }
    }
    }catch(err){
        return err
    }
}

module.exports = {
    createUrl
}