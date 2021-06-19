const express = require('express')
const User = require('../db/user');
const jwt = require('jsonwebtoken');
const CONSTS = require('../consts/consts')

const router = express.Router();

router.get('/login', (req, res) => {
    res.cookie('nesto', 'vrednost', { maxAge: 5000 })
    res.render('login')

})
router.post('/login', async (req, res) => {

    try {
        let resultSet = await User.find({ mail: req.body.mail, password: req.body.password});
        if (resultSet.length > 0) {
            const token = jwt.sign({id : resultSet._id}, CONSTS.SECRET, {expiresIn: CONSTS.JWT_EXPIRES});
            res.cookie('jwt', token, {maxAge: CONSTS.JWT_EXPIRES * 1000, httpOnly: true})
            res.json({ isOk: true , loginMessage: "everything went well"})
        } else {
            res.json({ isOk: false ,  loginMessage: "username or password are not correct" })
        }

    } catch (err) {
        console.log("ajdeee");
        console.log(err);
      res.json({ isOk: false, loginMessage: "Unknown error ocured during login" })

    }
})


module.exports = router;