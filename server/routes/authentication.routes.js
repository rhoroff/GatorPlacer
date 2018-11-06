var path = require('path');
module.exports = function(app, passport){

    app.get('/', isLoggedIn, function(req, res, next){//Checks if user is logged in and then...
        if(req.user.role == "Professor"){//Redirects based off of user roles
            res.redirect('./professor.html');//TODO: Change to professor view
        }
        return next();

    });
    //=================
    //LOGIN

    //================= 
    app.get('/login', function(req, res) {//Does login
        res.render('login.ejs', {message: req.flash('loginMessage')});//Loads login view
    });

    app.post('/login', passport.authenticate('local-login' , {//Uses passport to handle authentication
        successRedirect : '/',
        failureRedirect : '/login',
        failureFlash : true
    }));
    //====================
    //PROFESSOR
    //====================
    app.get('/professor', function(req,res) {
        res.sendFile(path.resolve('client/professor.html'));
    });

    //====================
    //SIGNUP
    //====================
    app.get('/signup', function(req,res) {//redirects to singup
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', //redirect back to the front page but with login
        failureRedirect : '/signup', //go back to signup page
        failureFlash: true //allows for flash messages
    }));

    //Process signup
    app.post('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });

    app.get('/logout', function(req,res) {
        req.logout();
        res.redirect('/');
    });

    function isLoggedIn(req,res,next) {//USE THIS TO CHECK IF THERE IS A LOGIN
        if(req.isAuthenticated())
            return next();

            res.redirect('/login');
    }
}