const usersModel = require("../models/users.model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const {APP_SECRET} = process.env;

exports.signup = async function (req, res) {
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
        console.log("passnya", APP_SECRET);
        const token = jwt.sign({id: user.id}, APP_SECRET);
        
        return res.json({
            success: true,
            message: "Register success",
            results: token
        });

    } catch (err) {
        return res.json({
            success: false,
            message: `Registration failed, ${err}`
        });  
    }
};

// exports.login = async (req, res) => {
//   try {
//     const {username, password} = req.body
//     const user = await usersModel.findOneByUsername(username)
//     console.log(user)
//   } catch (error) {
    
//   }
// }