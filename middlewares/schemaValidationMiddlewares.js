import joi from "joi";

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

const signupSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    user: joi.string().required(),
    cpf: joi.string().required().length(11),
    img: joi.string().required()
})

function loginValidation(req, res, next) {
    const login = req.body;
    const validateLogin = loginSchema.validate(login)

    if (validateLogin.error) {
        res.status(422).send("preencha corretamente os campos");
        return;
    } else {
        res.locals.user = req.body;
    }

    next();
}

function signUpValidation(req, res, next) {
    const signup = req.body;
    const validateSignup = signupSchema.validate(signup)

    if (validateSignup.error) {
        res.status(422).send("preencha corretamente os campos");
        return;
    } else {
        res.locals.user = req.body;
    }

    next();
}

export { signUpValidation, loginValidation };