var createError = require('http-errors');

// Middleware function to check for logged-in users
var sessionCheckerLoginFridas = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        if (req.session.user.type == 'fridas')
            res.redirect('modulos');
        else
            next(createError(403));
    } else {
        next();
    }
};

// Middleware function to check for logged-in Fridas users
var sessionCheckerFridas = (req, res, next) => {
    // console.log(req.session.user, req.cookies.user_sid)
    setTimeout(() => {
        if (req.session.user && req.cookies.user_sid) {
            if (req.session.user.type == 'fridas')
                next();
            else
                next(createError(403));
        } else {
            console.log('entra else')
            if (req.originalUrl.match('fridas'))
                global.targetUrl = `${global.baseUrl}/fridas${req.url}`;
            res.redirect(`${global.baseUrl}/fridas/inicio-sesion`);
        }
    }, 0);
};

// Middleware function to check for logged-in users
var sessionCheckerLoginMentores = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        if (req.session.user.type == 'mentores')
            res.redirect('mis-equipos');
        else
            next(createError(403));
    } else {
        next();
    }
};

// Middleware function to check for logged-in Mentores users
var sessionCheckerMentores = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        if (req.session.user.type == 'mentores')
            next();
        else
            next(createError(403));
    } else {
        if (req.originalUrl.match('mentores'))
            global.targetUrl = `${global.baseUrl}/mentores${req.url}`;
        res.redirect(`${global.baseUrl}/mentores/inicio-sesion`);
    }
};

// Middleware function to check for logged-in Lideres users
var sessionCheckerLideres = (req, res, next) => {
    setTimeout(() => {
        if (req.session.user && req.cookies.user_sid) {
            if (req.session.user.type == 'lideres')
                next();
            else
                next(createError(403));
        } else {
            if (req.originalUrl.match('lideres'))
                global.targetUrl = `${global.baseUrl}/lideres${req.url}`;
            res.redirect(`${global.baseUrl}/lideres/inicio-sesion`);
        }
    }, 0);
};

// Middleware function to check for logged-in users
var sessionCheckerLoginLideres = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        if (req.session.user.type == 'lideres')
            res.redirect('equipos');
        else
            next(createError(403));
    } else {
        next();
    }
};

module.exports = {
    sessionCheckerLoginFridas,
    sessionCheckerFridas,
    sessionCheckerLoginMentores,
    sessionCheckerMentores,
    sessionCheckerLoginLideres,
    sessionCheckerLideres
};