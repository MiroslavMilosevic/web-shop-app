const express = require('express')
const router = express.Router();
const User = require('../db/user');
const getRandomPhones = require('../midleware/getRandomPhones');
const Phone = require('../db/phone');




router.get('/home', async (req, res) => {
    let nizRandomTelefona = await getRandomPhones()
    console.log(req.params);
    if (req.cookies.jwt === undefined || req.cookies.jwt === '') {

        res.render('homeNot', { telefoni: nizRandomTelefona, page: undefined, plainHome: true, });
    } else {
        try {
            let verifycation = jwt.verify(req.cookies.jwt, CONSTS.SECRET)
            res.render('homeLoged', { telefoni: [], page: undefined, plainHome: true })
        } catch (err) {
            console.log('error ocured at /home path in catch block');
            console.log(err);
            res.render('homeNot', { telefoni: [], page: undefined, plainHome: true })
        }
    }
})

router.get('/home/:what/:page/:value', async (req, res) => {
    const params = req.params;

    console.log(params);
    if (params.what === 'all') {
        if (params.page < 0 || isNaN(params.page)) {
            res.redirect('/home/all/0/null');
        }
        try {
            let rs = await Phone.find().limit(5).skip(params.page * 5)
            res.render('homeNot', { telefoni: rs, page: params.page, plainHome: false, what: params.what, value: params.value })
        } catch (err) {
            console.log(err);
        }
    } else if (params.what === 'search') {
        let SearchValue = params.value;
        let rs = await Phone.find();
        // console.log(rs[0]);
        rs = rs.filter(telefon => {
            return telefon.marka.toUpperCase().includes(SearchValue.toUpperCase())
                || telefon.model.toUpperCase().includes(SearchValue.toUpperCase()) ||
                telefon.naslov.toUpperCase().includes(SearchValue.toUpperCase())
                || telefon.softver.toUpperCase().includes(SearchValue.toUpperCase())
        })
            .splice(params.page * 5, 5);
        res.render('homeNot', { telefoni: rs, page: params.page, plainHome: false, what: params.what, value: params.value })

    } else if (params.what === 'mark') {

        let rs = await Phone.find({ marka: params.value })
        rs = rs.splice(params.page * 5, 5)
        res.render('homeNot', { telefoni: rs, page: params.page, plainHome: false, what: params.what, value: params.value })

    } else if (params.what === 'price') {
        console.log("usli smo u price blok", params.value.split('v').length);
        if(params.value.split('v').length === 2){
            let priceFrom = params.value.split('v')[0]
            let priceTo = params.value.split('v')[1];
            console.log("usli smo u drugi deo");
            let isPriceRangeValid =  ! isNaN(priceFrom) && ! isNaN(priceTo)
            console.log(priceFrom);
            console.log(isNaN(priceFrom));

            if(isPriceRangeValid){
              try{
               let rs = await Phone.find({ cena : { $gt :  Number(priceFrom), $lt : Number(priceTo)}});
               rs = rs.splice(params.page * 5, 5)
                res.render('homeNot', { telefoni: rs, page: params.page, plainHome: false, what: params.what, value: params.value })
             }catch(err){
                  console.log(err);
              }
        }
        }

    }

});




module.exports = router;