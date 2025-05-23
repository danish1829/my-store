const express = require('express');
const connectDB = require('./config/dataBase');
const app = express();
const cookies = require('cookie-parser');
const routes = require('./routes/index');
const cors = require('cors');

const PORT = 5555;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials : true,
}));

app.use('/', routes);



connectDB().then(()=>{
    console.log('database connected successfully');
    app.listen(PORT, ()=>{
        console.log(`server running on ${PORT}`);
        
    })
}).catch(()=>{
    console.log('something went wrong!!');
})
