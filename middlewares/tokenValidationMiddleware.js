import joi from "joi";

const tokenSchema = joi.string().required()

function hasValidToken(req, res, next) {
    const Authorization = req.headers.Authorization;
    const hasBearer = Authorization.includes("Bearer ")

    if (!hasBearer) {
        res.status(422).send("invalid token");
        return
    }

    const token = Authorization?.replace("Bearer ", "")

    if (!token) {
        res.status(401).send("invalid token");
        return
    }

    const validateToken = tokenSchema.validate(token)

    if (validateToken.error) {
        res.status(401).send("invalid token");
        return
    }

    res.locals.token = token;

    next();
}

export default hasValidToken;