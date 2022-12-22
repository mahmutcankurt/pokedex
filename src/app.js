const express = require('express');
const app = express();
const routes = require('./Routes/routes')
const createPokedex = require('./Controllers/controller')

// port define
const PORT = parseInt(process.env.PORT) || 8080;

app.use(express.json());
app.use('/', routes);

// port listener
const listener = app.listen(process.env.PORT || 8080, () => {
    console.log('My app is listening on port ' + listener.address().port)
    createPokedex.createPokedex();
});