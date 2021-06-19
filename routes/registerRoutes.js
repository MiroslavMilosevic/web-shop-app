const express = require('express')
const router = express.Router();
const redirectNotLoged = require('../midleware/redirectNotLoged');
const registerUser = require('../functions/registerUser');
const User = require('../db/user');

router.get('/register', async (req, res) => {
    res.render('register')
})


router.post('/register', registerUser)







module.exports = router;