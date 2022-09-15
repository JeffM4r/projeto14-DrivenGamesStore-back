import express from "express";
import cors from "cors";
import signUpRouter from "./routers/signup.routers.js";
import loginRouter from "./routers/login.routers.js";

import mongo from "./db/db.js";
let db = await mongo();

const server = express();

server.use(cors());
server.use(express.json());

server.use(signUpRouter);
server.use(loginRouter);


server.listen(process.env.PORT,()=>{
    console.log("listen on port " + process.env.PORT);
})