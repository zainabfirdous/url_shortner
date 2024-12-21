const express = require('express')
const validateRequest = require('../Validation')
const {createShortUrl} = require('../controller/shortUrl')

const shorten = express.Router()

shorten.post('/', validateRequest("createForm") , async(req, res, next)=>{
    try{
        const response = await createShortUrl(req, res);
        res.status(200).send(response)
    }catch(err){
        res.status(err.status).send(err.message)
    }
});


module.exports = {shorten}