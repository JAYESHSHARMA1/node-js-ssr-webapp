

exports.authenticate = function(req, res, next) {
    if(req.session && req.session.user && req.session.user._id){
       return next();
    }
    res.redirect('/login');
}

exports.isAdmin = function(req, res, next) {
    if(req.session && req.session.user && req.session.user.role === 'admin'){
       return next();
    }
    res.redirect('/');
}