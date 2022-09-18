import mongo from "../db/db.js";
let db = await mongo();

const receive = async (req,res) =>{
    const token = res.locals.token;
    try {
        const userSession = await db.collection("sessions").findOne({token:token})
        if (!userSession){
            res.status(401).send("invalid token");
            return
        }

        await db.collection("shoppingCart").remove({userId:userSession.userId})

        res.status(200).send("Compra Concluida com sucesso");
        return
    } catch (error) {
        res.status(500).send(error.message);
        return
    }

}

export {receive};