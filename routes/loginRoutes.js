const express = require('express')
const User = require('../db/user');
const jwt = require('jsonwebtoken');
const CONSTS = require('../consts/consts')
const loginUser = require('../functions/loginUser')


const router = express.Router();

router.get('/login', (req, res) => {
    res.cookie('nesto', 'vrednost', { maxAge: 2000 })
    res.render('login')

})
router.post('/login', loginUser)



router.get('/test', async(req, res)=>{
    let rs = await User.find().limit(3).skip(3)
    console.log(rs);
    res.json({q:'qq'})
})



module.exports = router;