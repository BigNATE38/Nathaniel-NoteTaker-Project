const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const { notes } = require('./db/db.json');
const apiRoute = require('./the_routes/API_Route');
const htmlRoute = require('./the_routes/HTML_Route');

app.use(express.urlencoded({ extended: true}));

app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoute);
app.use('/', htmlRoute);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
});