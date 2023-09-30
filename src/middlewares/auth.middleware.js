// const errorHandler = require("../helpers/errorHandler.helper");
const jwt = require("jsonwebtoken");
const {APP_SECRET} = process.env;

const authMiddleware = (request, response, next) => {
    try{
        const {authorization: auth}= request.headers;
        if(!auth && 
        !auth?.startsWith("Bearer ")){
            throw Error("unauthorized");
        }
        const token = auth.slice(7);
        request.user = jwt.verify(token, APP_SECRET);
        return next();
    } catch(error){
        return response.json({
            success: false,
            message: `${error}`
        });
    }
};

module.exports = authMiddleware;
