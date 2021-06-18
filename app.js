const express = require("express");
const CONSTS = require("./consts/consts");
const cors = require("cors");
const cookie_parser = require('cookie-parser');
const app = express();
const routesLogin = require('./routes/loginRoutes');
const routesRegister = require('./routes/registerRoutes');
const mongoose = require('mongoose');

app.set("view engine", "ejs");
///////
app.use(express.static('front-script'));
app.use(express.json());
app.use(cors());
app.use(cookie_parser());
/////////



app.use(routesLogin);
app.use(routesRegister);

app.get('/home', (req, res) => {
    if (req.cookies.isLoged) {
        res.render('homeLoged')
    } else {
        res.render('homeNot')
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
