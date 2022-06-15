import express from 'express';
import mongoose from "mongoose";
import config from 'config';

const PORT = config.get('serverPort');
const app = express();

app.use(express.json())

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
