const express = require('express')
const router = express.Router();
const User = require('../db/user');
const getRandomPhones = require('../midleware/getRandomPhones');
const Phone = require('../db/phone');




router.get('/home', async (req, res) => {
    let nizRandomTelefona = await getRandomPhones()
    console.log(req.params);
    if (req.cookies.jwt === undefined || req.cookies.jwt === '') {

        res.render('homeNot', { telefoni: nizRandomTelefona, page: undefined });
    } else {
        try {
            let verifycation = jwt.verify(req.cookies.jwt, CONSTS.SECRET)
            res.render('homeLoged')
        } catch (err) {
            console.log('error ocured at /home path in catch block');
            console.log(err);
            res.render('homeNot')
        }
    }
})

router.get('/home/:what/:value', async (req, res) => {
    const params = req.params;

    if (params.what === 'page') {

        let rs = await Phone.find().limit(5).skip(params.value * 5)
        console.log(typeof rs);

        res.render('homeNot', { telefoni: rs, page: params.value })
    } else if (params.what === 'search') {

    } else if (params.what === 'marka') {

    }

});




module.exports = router;