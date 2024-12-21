const express = require('express')
const cors = require('cors')
const {shorten} = require('./routes/shorten')
const {user} = require('./models/user')
const {sequelize} = require("./config/db_config")

//verifying db connection
const dbAuthenticate = async(sequelize)=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

const app = express()

app.use(cors({
    origin:'*',
    methods:'GET, POST, PUT, DELETE'
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//setting routes based on api prefix
app.use('/api/shorten',shorten)

dbAuthenticate(sequelize)
sequelize.sync({ force: true }).then(() => {
  console.log('Database synced');
}).catch((error) => {
  console.error('Error syncing database:', error);
});
const port = 3000
app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`)
})


