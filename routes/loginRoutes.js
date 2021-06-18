const express = require('express')
 
const router = express.Router();

router.get('/login', (req, res)=>{
    res.cookie('nesto', 'vrednost', {maxAge:10000})
    console.log(req.cookies);
    res.render('login')
    
})
router.post('/login', (req, res)=>{
         if(req.body.name==='test'){
             res.cookie('isLoged', true);
             res.json({message:"user sucessfuly loged in", ok:true})
         }else{
            res.json({message:"wrong email or password", ok:false})
         }
})


module.exports = router;