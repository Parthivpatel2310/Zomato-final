import joi from "joi";

//signup
export const validateSignup = (userdata)=>{
    const Schema = joi.object({
        fullName: joi.string().required().min(5),
        mail: joi.string().email().required(),
        password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
        address: joi.array().items(joi.object({details: joi.string(), for: joi.string()})),
        phoneNumber: joi.array().items(joi.number().min(10).max(10))
    });
    return Schema.validateAsync(userdata);
};

//signIn
export const validateSignin = (userdata)=>{
    const Schema = joi.object({
        
        mail: joi.string().email().required(),
        password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    });
    return Schema.validateAsync(userdata);
};