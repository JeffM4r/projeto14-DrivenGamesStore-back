import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import mongo from "../db/db.js";
let db = await mongo();

const create = async (req, res) => {
    const { email, password } = res.locals.user;
    let users;

    try {
        users = await db.collection("registered").find().toArray();

        const found = users.find(user => user.email === email);

        if (!found) {
            res.status(401).send("User not found");
            return
        }

        const passwordIsValid = bcrypt.compareSync(password, found.password);

        if (!passwordIsValid) {
            res.status(401).send("User does not exist or wrong password");
            return
        }

        let alreadyLogged = await db.collection("sessions").findOne({ userId: found._id })

        if (alreadyLogged) {
            alreadyLogged = { ...alreadyLogged, time: Date.now() }

            await db.collection("sessions").updateOne({
                _id: alreadyLogged._id
            }, { $set: alreadyLogged })

            res.status(200).send({token:alreadyLogged.token, name:found.name});
            return
        }

        if(found && passwordIsValid) {
            const token = uuid();
            await db.collection("sessions").insertOne({
                userId:found._id,
                token:token,
                time:Date.now()
            })

            res.status(200).send({token:token, name: found.name, user:found.user});
            return
        }
        
        res.status(401).send("User does not exist or wrong password");
        return

    } catch (error) {
        res.status(500).send(error.message);
        return
    }

}

export { create };