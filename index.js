const express = require('express');
const bodyParser = require('body-parser');
const template = require('express-ejs-layouts')
// db
const db = require('./config/mongoose')
// passport
const passport = require('./config/passportLocal');
const session = require('express-session');
const MongoStore = require('connect-mongo');


const path = require('path');
const PORT = 8000;

// express instance
const app = express();

// setting static files
app.use(express.static(path.join(__dirname , 'assets')));
// to use ejs
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));

// to handle req
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


// template
app.use(template);
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);



// passport / session setup
app.use(session({
    name:'issueTracker',
    secret:'hash@64',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:100*60*100},
    store: MongoStore.create({
        mongoUrl:'mongodb://127.0.0.1:27017/IssueTracker_DB',
        collection:'session',
        autoRemove:'interval',
        autoRemoveInterval: 1,
    },function(err){
        console.log('error in Session Setup');
    }),
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


// setting route
app.use('/',require('./routes/index'));

app.listen(PORT,function(err){
    if(err)
    {
        console.log('Error in starting server ',err);
        return
    }
    console.log('Server Started ');
})