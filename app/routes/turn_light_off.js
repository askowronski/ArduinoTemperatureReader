

module.exports = function(app, serialport) {
    app.post('/turnLightOff', (req, res) => {
        // You'll create your note here.
    res.send('Hello');


    serialport.write('/digital/13/0',function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written');
    });
    serialport.flush();

});
};
