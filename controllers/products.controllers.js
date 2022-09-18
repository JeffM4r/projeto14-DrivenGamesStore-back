import { ObjectId } from "mongodb";
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

const listOne = async (req,res) => {
    const token = res.locals.token
    const productId = req.params.productId

    try {
        const user = await db.collection("sessions").findOne({token:token})

        if(!user){
            res.status(401).send("invalid token");
            return
        }

        const productFound = await db.collection("products").findOne({_id:ObjectId(productId)});
        

        if(!productFound){
            res.status(404).send("Product not found");
            return
        }

        res.status(200).send(productFound);
        
    } catch (error) {
        res.status(500).send(error.message);
        return
    }
}

const addInCart = async (req,res) => {
    const token = res.locals.token
    const productId = req.params.productId

    try {
        const user = await db.collection("sessions").findOne({token:token})

        if(!user){
            res.status(401).send("invalid token");
            return
        }

        const productFound = await db.collection("products").findOne({_id:ObjectId(productId)});        

        if(!productFound){
            res.status(404).send("Product not found");
            return
        }

        const insertingProduct = await db.collection("shoppingCart").insertOne({userId:user.userId, productId:productFound._id, productName:productFound.name})

        res.status(200).send(insertingProduct);
        
    } catch (error) {
        res.status(500).send(error.message);
        return
    }
}

const showCart = async (req,res) => {
    const token = res.locals.token

    try {
        const userSession = await db.collection("sessions").findOne({token:token})

        if(!userSession){
            res.status(401).send("invalid token");
            return
        }

        let totalValue = 0;
        let productsFound= [];
        let userCart = await db.collection("shoppingCart").find({userId:userSession.userId}).toArray();
        let user = await db.collection("registered").find({_id:userSession.userId}).toArray();
        let allProducts = await db.collection("products").find().toArray();

        userCart.forEach(async product => {
                productsFound = [...productsFound, allProducts.find(productive => productive.name === product.productName)]
        }); 
        
        productsFound.forEach(async product =>{
            totalValue += product.price
        })
        
        res.status(200).send({productsFound, totalValue, user:{name:user[0].name,email:user[0].email, user:user[0].user, cpf:user[0].cpf}});
        return
        
    } catch (error) {
        res.status(500).send(error.message);
        return
    }
}

export {list, listOne, addInCart, showCart};