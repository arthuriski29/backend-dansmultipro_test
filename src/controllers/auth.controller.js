const usersModel = require("../models/users.model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const {APP_SECRET} = process.env;

exports.signup = async (req, res) => {
    try {
        const {username, password} = req.body;
        if(!username){
            return res.json({
                success: false,
                message: "Username should'nt be empty !",            
            });
        }
        if(!password){
            return res.json({
                success: false,
                message: "Password should'nt be empty !",            
            });
        }
        const hash = await argon.hash(password);
        const data = {
            ...req.body,
            password: hash
        };
        
        const user = await usersModel.insert(data);
        const token = jwt.sign({id: user.id}, APP_SECRET);
        
        return res.json({
            success: true,
            message: "Register success",
            results: {token}
        });

    } catch (err) {
        return res.json({
            success: false,
            message: `Registration failed, ${err}`
        });  
    }
};


exports.login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await usersModel.findOne(username);
        if(!user){
            throw Error("wrong_credentials");
        }
        const verify = await argon.verify(user.password, password);
        if(!verify){
            throw Error("wrong_credentials");
        }
        const token = jwt.sign({id: user.id}, APP_SECRET);
        return res.json({
            success: true,
            message: "Login success!",
            results: {token}
        });
    } catch(err) {
        return res.json({
            success: false,
            message: `Registration failed, ${err}`
        });  
    }
};
