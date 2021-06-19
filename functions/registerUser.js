const User = require('../db/user');
const jwt = require('jsonwebtoken');
const CONSTS = require('../consts/consts')

async function registerUser(req, res, next) {

    try {
        let resultSet = await User.find({ $or: [{ username: req.body.username }, { mail: req.body.mail }] })
        if (resultSet.length > 0) {
            console.log("vec postoji ovakav user");
            res.json({ isOk: false, registerStatus: 'User with this email or username already exists' })
        } else {
            console.log("novi user se moze napraviti");
            let newUser = new User({
                username: req.body.username,
                mail: req.body.mail,
                password: req.body.password,
                comments: 0,
                description: "no description yet"
            })
            try {
                let responseAdded = await newUser.save();
                const id = responseAdded._id;
                const secret = CONSTS.SECRET;
                const token = jwt.sign({ id: id }, secret, { expiresIn: CONSTS.JWT_EXPIRES })
                res.cookie('jwt', token, { maxAge: CONSTS.JWT_EXPIRES * 1000, httpOnly: true });
                res.json({ isOk: true, responseAdded: responseAdded, registerStatus: ' everything went well' })
            } catch (err) {
                res.json({ isOk: false, registerStatus: 'Error ocured during user insert into database' })
            }
        }
    } catch (err) {
        console.log(err);////////////////////////////////////////////////
        res.json({ isOk: false, registerStatus: 'Error ocured during user insert into database' })
    }










}


module.exports = registerUser;