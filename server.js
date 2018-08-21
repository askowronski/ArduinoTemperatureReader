const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
var SerialPort = require('serialport');
const Buffer = require('safe-buffer').Buffer;
var Readline = SerialPort.parsers.Readline;
var parser = new Readline(); // make a new parser to read ASCII lines
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/temperature');




const thePort = new SerialPort('/dev/cu.usbmodem1411', {
    baudRate:115200,
    parser:parser
}

    );


thePort.open(function (err) {
    if (err) {
        return console.log('Error opening port: ', err.message);
    }

    thePort.write('/mode/13/o',function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written');
    });
    thePort.flush();
});
thePort.on('data', function (data) {
    console.log('Data:', data[0]);
    var collection = db.get('temperature');
    collection.insert({
        "temperature": data[0],
        "date":new Date()

    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            console.log(
                "There was a problem adding the information to the database. mes:", err.message );
        }
        else {
            // And forward to success page
            console.log("temperatureSaved");
        }
    });

});




// The open event is always emitted

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', '*');



    // Pass to next layer of middleware
    next();
});

const port = 8000;
require('./app/routes')(app,thePort,db);
app.listen(port, () => {

    console.log('We are live on ' + port);
});