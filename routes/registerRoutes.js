const express = require('express')
const router = express.Router();
const redirectNotLoged = require('../midleware/redirectNotLoged');
const registerUser = require('../functions/registerUser');
const User = require('../db/user');

router.get('/register', async (req, res) => {

    res.render('register')
})
router.post('/register', async (req, res) => {
    try {

     let resultSet  = await User.find({$or : [{ username: req.body.username }, { mail: req.body.mail }]})
        if (resultSet.length > 0) {
            console.log("vec postoji ovakav user");
            res.json({ isOk: false})
        } else {
            console.log("novi user se moze napraviti");
            let newUser = new User({
                username: req.body.username,
                mail: req.body.mail,
                password: req.body.password,
                comments: 0,
                description: "no description yet"
            })
            let responseAdded = await newUser.save();

            res.json({ isOk: true , responseAdded:responseAdded })
        }
    } catch (err) {
      console.log(err);
    }



})

module.exports = router;