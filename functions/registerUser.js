const User = require('../db/user');


async function registerUser(mail, username , password){


   let response = await User.find()
     
   console.log(response);
}


module.exports = registerUser;