// import other routes
const userRoutes = require('./users');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('Welcome Folks');
    });

    // run our user route module here to complete the wire up
    userRoutes(app, fs);

};


// this line is unchanged
module.exports = appRouter;