const cookie_parser = require('cookie-parser');


function redirectNotLoged(req, res, next){
     if(req.cookies.isLoged){
         res.redirect('/')
     }
}

module.exports.ulogovan = redirectNotLoged;