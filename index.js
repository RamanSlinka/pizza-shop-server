const express =require ('express');
const mongoose = require ("mongoose");
const config =require ('config');
const cors = require ('cors');
const userRouter = require ('./routes/userRouter.js')
const pizzasRouter = require ('./routes/pizzasRouter.js')
const errorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = config.get('serverPort');

const app = express();
app.use(express.json())
app.use(cors())
app.use('/api', userRouter)
app.use('/api', pizzasRouter)



//handler error, last middleware
app.use(errorHandler)  //may be at the end!

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
