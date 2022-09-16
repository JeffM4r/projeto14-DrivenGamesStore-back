import express from "express";
import cors from "cors";
import signUpRouter from "./routers/signup.routers.js";
import loginRouter from "./routers/login.routers.js";
import productsRouter from "./routers/products.routers.js"

import mongo from "./db/db.js";
let db = await mongo();

const server = express();

server.use(cors());
server.use(express.json());

server.use(signUpRouter);
server.use(loginRouter);
server.use(productsRouter);


server.listen(process.env.PORT,()=>{
    console.log("listen on port " + process.env.PORT);
});