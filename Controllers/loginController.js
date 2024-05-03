let loginRouter = require("express").Router();
let bcrypt = require('bcryptjs');
let jwt=require("jsonwebtoken");
const { SECRET } = require("../utils/SECRET");
let db = []

loginRouter.post("/login", async(req, res) => {
    let { username, password } = req.body;
    let result = db.find(user => user.username === username)
    if (result) {
        let pwCompare= await bcrypt.compare(password, result.password);  
        console.log("pwCompare: ",pwCompare);
        console.log("result.password",result.password);
        let token = jwt.sign({ username, password }, SECRET, { expiresIn: "1h" });
        if(pwCompare){
            
            res.json({
                success:1,
                token,
                username,
                message: "Login Success"
                
            })
        }else{
            res.json({
                message:"Invailid password",
                success:0
            })
        } 
    }else{
        res.json({
            success:0,
            message:"Login Unsuccessful"
        })
    }
})


loginRouter.post("/signup",async(req, res) => {
    let { username, password } = req.body;
    password=await bcrypt.hash(password,10 );
    let token = jwt.sign({ username, password }, SECRET, { expiresIn: "1h" });
    db.push({
        username,
        password
    });
    res.json({
        success:1,
        message: "Signup Successful",
        token
    })
})
module.exports = loginRouter;