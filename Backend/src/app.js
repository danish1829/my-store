const express = require('express');
const connectDB = require('./config/dataBase');
const app = express();
const userRouter = require('./routes/users');
const clothRouter = require('./routes/clothes');
const cookies = require('cookie-parser')

const PORT = 5555;

app.use(express.json());
app.use(cookies());

app.use('/', userRouter);
app.use('/', clothRouter)

connectDB().then(()=>{
    console.log('database connected successfully');
    app.listen(PORT, ()=>{
        console.log(`server running on ${PORT}`);
        
    })
}).catch(()=>{
    console.log('something went wrong!!');
})
