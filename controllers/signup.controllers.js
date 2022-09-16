import bcrypt from "bcrypt";
import mongo from "../db/db.js";
let db = await mongo();

const create = async (req,res) => {
    const {name,user,cpf,email,password,img} = res.locals.user;
    let cryptedPassword = bcrypt.hashSync(password, 11);
    let users;

    try {
        users = await db.collection("registered").find().toArray();

        const found = users.find(user2 => user2.user === user);

        if(found){
            res.status(409).send("User already registered");
            return
        }

        await db.collection("registered").insertOne({
            name:name,
            email:email,
            password:cryptedPassword,
            user:user,
            cpf:cpf,
            img:img
        });

        res.status(201).send("registration complete")

    } catch (error) {
        res.status(500).send(error.message);
        return
    }
}

export {create};