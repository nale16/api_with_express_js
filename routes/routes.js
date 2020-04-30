"use strict";

// import other routes
const userRoutes = require('./crud');

const appRouter = (app, fs) => {

    // default route
    app.get('/', (req, res) => {
        res.send('Welcome Folks :)');
    });

    
    userRoutes(app, fs);

};


// export
module.exports = appRouter;