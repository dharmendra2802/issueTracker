module.exports.home = function(req,res)
{
    if(req.isAuthenticated())
        return res.redirect('/user/page/mainPage');

    return res.render('home');
}