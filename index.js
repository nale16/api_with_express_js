
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

const fs = require('fs');
// const book = require("./routes/crud")
// const book = require("./routes/routes")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const routes = require('./routes/routes.js')(app, fs);

// running on port 8000.
const server = app.listen(8000, () => {
    console.log('listening on port %s...', server.address().port);
});