

module.exports = function(app,serialport) {
    app.post('/turnLightOn', (req, res) => {

    serialport.write('/digital/13/1',function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written');
    });
    serialport.flush();

    res.send('Hello');


});
};
