const Redis = require('ioredis')

/*my redis server is running on default settings, ie., local host, 6379 port,
incase your redis server has different config please alter accordingly*/
const redis = new Redis()

module.exports = {redis}