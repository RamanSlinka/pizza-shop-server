import express from 'express';
import mongoose from "mongoose";

const PORT = 5000;
const DB_URL = 'mongodb+srv://user:user@cluster0.jz2fye9.mongodb.net/?retryWrites=true&w=majority'
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json('server work')
})

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => {
            console.log(`server started on PORT ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
startApp()
