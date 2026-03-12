exports.ensureLoggedOut = (req, res, next ) => {
     if (req.isAuthenticated()) {
        console.log('already logged in')
        return res.redirect('/')
    }
    return next();
}

exports.ensureLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        console.log('need to logged in')
        return res.redirect('/auth/log-in')
    }
    return next();
}

exports.ensureMember = (req, res, next) => {
     if (!req.user.membership_status) {
        console.log('need to be member')
        return res.redirect('/')
    }
    return next();
}

exports.ensureNotMember = (req, res, next) => {
    if (req.user.membership_status) {
        console.log('already a member')
        return res.redirect('/')
    }
    return next();
}

exports.ensureAdmin = (req, res, next) => {
     return next();
}