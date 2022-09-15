import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

async function mongo(){
    let connection;

    try {
        connection = await mongoClient.db("drivenGames");
        return connection;

    } catch (error) {
        console.log(error);
        return error;
    }
}

export default mongo;