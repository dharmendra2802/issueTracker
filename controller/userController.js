const User = require('../models/user'); // data model
const bcrypt = require('bcrypt'); // hashing

// for signin page
module.exports.signin = function(req,res)
{
    
    if(req.isAuthenticated())
        return res.redirect('/user/page/mainPage');

    return res.render('signin');
}

// for signup page
module.exports.signup = function(req,res)
{
    
    if(req.isAuthenticated())
        return res.redirect('/user/page/mainPage');
        
    return res.render('signup');
}


// creating session
module.exports.createSession = function(req,res)
{
    // console.log(req.body.id)
    // req.flash('success','Logged in Successfully')
    return res.redirect('/user/page/mainPage');
}



// creating new user
module.exports.createUser = async function(req,res)
{
    try {
        // check if user already exists or not
        const user = await User.findOne({email:req.body.email});

        if(user){
            // req.flash('error','User already Exist')
            return res.render('signin');
        }
        else
        {
            // checink pass and confirm pass field
            if(req.body.password !== req.body.confirmPassword)
            {
                // req.flash('error','Password Mismatch')
                return res.redirect('back');
            } 
            // hashing password
            const hashPass = await bcrypt.hash(req.body.password,10);
            req.body.password = hashPass;
                await User.create({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password,
            })
            // req.flash('success','User Created successfully');
            return res.render('signin');
        }
    }catch(err) {
        console.log("error in creating user - "+err);
        // req.flash('error','InternalError in creating an user')
        return res.render('signup');
    }
}


// destroying
module.exports.destroy = function(req,res)
{
    // req.flash('success','Logged out Successfully')
    req.logout(function(err){
        if(err)console.log(err);
    });
    return res.redirect('/');
}
