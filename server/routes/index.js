/**
 * Application Routing
 */
const passport = require('passport');

module.exports = (app) => {
    app.use('/api', require('./api'));
    app.use('/api/users', require('./api/users'));
    app.use('/api/artist', require('./api/artist'));
    app.use('/api/genre', require('./api/genre'));
    app.use('/api/track', require('./api/track'));
    
    app.use('/csv/artist', require('./csv/artist'));
    app.use('/csv/genre', require('./csv/genre'));
    app.use('/csv/track', require('./csv/track'));

    // app.use('/admin', passport.authenticate('jwt', { session: false }), require('./admin/index'));
}