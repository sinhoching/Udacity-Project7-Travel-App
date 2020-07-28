// Setup empty JS object to act as endpoint for all routes
projectData = {
    entries: []
};

const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(express.static('dist'));

// Setup Server
//set the variable
const port = 8000;
//Utilize the .listen() method
const server = app.listen(port, listening);
//The listening function
function listening() {
    console.log("server running");
    console.log(`running on local host: ${port}`);
}

//GET routes
app.get("/", function(req, res) {
    console.log("ooooga");
    res.sendFile(path.resolve('dist/explore.html'));
});

app.get("/all", function(req, res) {
    res.send(projectData)
});

//POST routes
app.post('/addData', addData);
function addData (req, res) {
    //console.log(data);
    const dataEntry = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content
    };
    projectData.entries.push(dataEntry);
};