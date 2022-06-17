const express =require ('express');
const mongoose = require ("mongoose");
const config =require ('config');
const cors = require ('cors');
const router = require ('./routes/userRouter.js')
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = config.get('serverPort');

const app = express();
app.use(express.json())
app.use(cors())
app.use('/api', router)



//handler error, last middleware
app.use(errorHandler)  //may be at the end!

app.get('/', (req, res) => {
    res.status(200).json('server work')
})

 const  startApp = async () => {
    try {
        await mongoose.connect(config.get('DB_URL'))
        app.listen(PORT, () => {
            console.log(`server started on PORT ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
startApp()
