const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const genPass = require('./modules/genPass')
const connection = require('./modules/dbConnection')

const app = express()


// configurations
app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


// Routes
app.get('/', (req, res) => {
    res.render('index', {pass: 0})
})
app.post('/generatePassword', (req, res) => {
    let reqData = {
        passLength: req.body.passLength,
        onlyDigit: req.body.onlyDigit,
        number: req.body.number,
        upperCase: req.body.upperCase,
        specialChar: req.body.specialChar
    }
    if (typeof req.body.passLength == 'undefined' || req.body.passLength == '')
        reqData.passLength = 10;

    let pass = genPass.generate(reqData.onlyDigit, reqData.number, reqData.upperCase, reqData.specialChar, reqData.passLength)
    console.log(reqData, pass);
    res.render('index', {pass});
});

app.post('/save', (req, res) => {
    let data = {
        pass: req.body.pass,
        email: req.body.email,
        username: req.body.username,
        link: req.body.link,
        description: req.body.description
    }
    connection.connect.query('INSERT INTO `hash` SET ?', data, (err, result) => {
        if (err) console.log(err)
        else console.log(result)
    })
})

app.get('/showDatabase', (req, res) => {
    connection.connect.query('SELECT * FROM `hash`', (err, result) => {
        if (err) throw err;
        console.log(result);
    })
})


app.listen('5000', (err) => {
    if (err) console.log(err)
    console.log('Server Up and Running at localhost:5000/');
})

