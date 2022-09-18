import joi from "joi";

const tokenSchema = joi.string().required()

function hasValidToken(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization) {
        res.status(401).send("no token received");
        return
    }

    const hasBearer = authorization.includes("Bearer ")

    if (!hasBearer) {
        res.status(422).send("invalid token");
        return
    }

    const token = authorization?.replace("Bearer ", "")

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