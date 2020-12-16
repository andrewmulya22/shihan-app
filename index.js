const express = require("express")
const app = express()
const pool = require("./db")
const path = require("path")
const session = require('express-session');

var PORT = process.env.PORT || 5000;

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use('/assets', express.static('assets'))
app.set('controllers', path.join(__dirname, 'controllers'))
app.set('models', path.join(__dirname, 'models'))
app.use(express.urlencoded({ extended: false }));

var login = require("./controllers/login")
app.use('/', login)

var register = require("./controllers/register")
app.use('/register', register)

var verify = require("./controllers/verify")
app.use('/verify', verify)

var logout = require("./controllers/logout")
app.use('/logout', logout)

var usermain = require("./controllers/usermain")
app.use('/user', usermain)

var account = require("./controllers/account")
app.use('/account', account)

var explore = require("./controllers/explore")
app.use('/explore', explore)

var showTopics = require("./controllers/showTopics")
app.use('/showTopics', showTopics)

var category = require("./controllers/category")
app.use('/category', category)

var post = require("./controllers/post")
app.use('/post', post)

app.listen(PORT)