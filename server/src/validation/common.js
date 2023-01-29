import joi from "joi";


export const validateId = (id)=>{
    const Schema = joi.object({
        _id: joi.string().required(),
    });
    return Schema.validateAsync(id);
};


export const validatecategory = (category)=>{
    const Schema = joi.object({
        category: joi.string().required(),
    });
    return Schema.validateAsync(category);
};


export const validateCity = (city)=>{
    const Schema = joi.object({
        city: joi.string().required(),
    });
    return Schema.validateAsync(city);
};

export const validateSearchString = (searchString)=>{
    const Schema = joi.object({
        searchString: joi.string().required(),
    });
    return Schema.validateAsync(searchString);
};