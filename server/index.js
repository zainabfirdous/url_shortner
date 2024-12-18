const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors({
    origin:'*',
    methods:'GET, POST, PUT, DELETE'
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port = 3000
app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)
})
