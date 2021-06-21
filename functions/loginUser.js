const express = require('express')
const User = require('../db/user');
const jwt = require('jsonwebtoken');
const CONSTS = require('../consts/consts')


async function loginUser(req, res, next){

    try {
        let resultSet = await User.find({ mail: req.body.mail, password: req.body.password});
        if (resultSet.length > 0) {
            const token = jwt.sign({id : resultSet._id}, CONSTS.SECRET, {expiresIn: CONSTS.JWT_EXPIRES});
            res.cookie('jwt', token, {maxAge: CONSTS.JWT_EXPIRES * 1000, httpOnly: true})
            res.json({ isOk: true , loginMessage: "everything went well", user:resultSet})
        } else {
            res.json({ isOk: false ,  loginMessage: "username or password are not correct" })
        }

    } catch (err) {
        console.log("ajdeee");
        console.log(err);
      res.json({ isOk: false, loginMessage: "Unknown error ocured during login" })

    }



}


module.exports = loginUser;