const express = require("express");
const CONSTS = require("./consts/consts");
const cors = require("cors");
const cookie_parser = require('cookie-parser');
const app = express();
const routesLogin = require('./routes/loginRoutes');
const routesRegister = require('./routes/registerRoutes');
const homeRoutes = require('./routes/homeRoutes');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Phone = require('./db/phone');

app.set("view engine", "ejs");
///////
app.use(express.static('front-script'));
app.use(express.static('styles'));

app.use(express.json());;
app.use(cors());
app.use(cookie_parser());
/////////



app.use(routesLogin);
app.use(routesRegister);
app.use(homeRoutes);


app.get('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 1, httpOnly: true })
    res.json({ isOk: true })
})

app.post('/add-phone-test', async (req, res) => {
console.log('pogodjen add phoneeeeee');
    let phone = new Phone({
        model: "Proba",
        marka: "Proba",
        procesor: "Proba",
        baterija: "Proba",
        kamera: "Proba",
        memorija: "Proba",
        softver: "Proba",
        cena: 10000  ,
        naslov: "Proba",
        slika: "https://s0.2mdn.net/10974076/300x600_-_animirani.png",
        komentari:['good price for quality', 'very good device']
    })

    try{
     //  let result = await phone.save();
       res.json({ proba: 'add-test-proba = sucess' })
    }catch(err){
        console.log(err);
    }
})

app.get('*', (req, res) => {

    res.send('<h1>page under development</h1>')

})

mongoose.connect(CONSTS.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
    app.listen(CONSTS.PORT, () => {
        console.log(CONSTS.START_MESSAGE + CONSTS.PORT);
    })

})
