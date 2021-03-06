
let models = require("../models");

let validator = require('validator');

const validateCreateUserFields = function(errors,req){
  if (!validator.isEmail(req.body.email)){
    errors["email"] = "Please use a valid email";
  }
  if (!validator.isAscii(req.body.password)){
    errors["password"] = "Invalid chars in password";
  }
  if (!validator.isLength(req.body.password,{min:8,max:25})){
    errors["password"] = "Password between 8 or 25 chars";
  }
}

exports.validateUser = function(errors,req){
  return new Promise((resolve,reject)=>{
    validateCreateUserFields(errors,req);
    return models.User.findOne({
      where: {
        email:req.body.email
      }
    }).then(u=>{
      if (u!==null){
        errors["email"]="Email already in use";
      }
      resolve(errors);
    })
  });

}
