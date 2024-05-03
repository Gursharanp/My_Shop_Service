let jwt=require("jsonwebtoken");
const { SECRET } = require("../utils/SECRET");

module.exports=function(req,res,next){
  let token =req.headers.authorization;
  if(token){
      jwt.verify(token,SECRET,(err,decoded)=>{
          if(err){
              console.log(err);
              res.json({
                  success:0,
                  message:"Token is Invalid"
                
              })
          }else{
              console.log("success");
              req.decoded=decoded;
              next();
          }
      })
  }else{
      res.json({
          success:0,
          message:"Token is not Provided"
      })
  }


};