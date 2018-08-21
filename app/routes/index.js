const turnLightOn = require('./turn_light_on');
const turnLightOff = require('./turn_light_off');
const setupPin = require('./setupPin');
const getTemperature = require('./get_temperature');


module.exports = function(app, serialport,db) {
    turnLightOn(app, serialport,db);
    turnLightOff(app, serialport,db);
    setupPin(app, serialport,db);
    getTemperature(app, serialport, db);
    // Other route groups could go here, in the future
};