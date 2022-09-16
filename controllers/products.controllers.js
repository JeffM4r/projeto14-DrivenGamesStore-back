import mongo from "../db/db.js";
let db = await mongo();

const list = async (req,res) => {
    const token = res.locals.token
    try {
        const user = await db.collection("sessions").findOne({token:token})
        if (!user){
            res.status(401).send("invalid token");
            return
        }

        let products = await db.collection("products").find().toArray();

        res.status(200).send(products);
        return
        
    } catch (error) {
        res.status(500).send(error.message);
        return
    }
};

export {list};