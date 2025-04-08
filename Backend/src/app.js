const express = require('express');
const connectDB = require('./config/dataBase');
const app = express();
const userRouter = require('./routes/users');
const cookies = require('cookie-parser')

const PORT = 5555;

app.use(express.json());
app.use(cookies());

app.use('/', userRouter);

connectDB().then(()=>{
    console.log('database connected successfully');
    app.listen(PORT, ()=>{
        console.log(`server running on ${PORT}`);
        
    })
}).catch(()=>{
    console.log('something went wrong!!');
})
