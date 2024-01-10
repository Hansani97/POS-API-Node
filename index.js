/*
* express-framework(npm i express)
* mongoose (npm i mongoose)
* nodemon (npm i nodemon -g (sudo))
* dotenv (npm i dotenv)
* body-parser (npm i body-parser)
* bcrypt (npm i bcrypt)
* jsonwebtoken (npm i jsonwebtoken)
* */


import express from "express";
import mongoose from "mongoose";
import {config} from "dotenv";
import bodyParser from "body-parser";
import userRoutes from "./routes/UserRoutes.js";
import customerRoutes from "./routes/CustomerRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import productRoutes from "./routes/ProductRoutes.js";
import cors from 'cors';
config();

const port = process.env.SERVER_PORT | 3000
const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

try{
    mongoose.connect('mongodb://127.0.0.1:27017/posapi');
    app.listen(port, () => {
        console.log(`api started & running on port ${port}`);
    })
}catch(err){
    console.log(err);
}

app.get('/', (req, resp) => {
    return resp.json({'message': 'server started'})
})

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/customers',customerRoutes);
app.use('/api/v1/orders',orderRoutes);
app.use('/api/v1/products',productRoutes);