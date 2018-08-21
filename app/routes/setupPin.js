/**
 * Created by askowronski on 8/19/18.
 */


module.exports = function(app, serialport) {
    app.post('/setupPin', (req, res) => {
        // You'll create your note here.
        res.send('Hello');

    serialport.write('/mode/13/o',function(err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written');
    });
    serialport.flush();

});
};
