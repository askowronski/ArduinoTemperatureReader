


module.exports = function(app, serialport,db) {

    app.get('/getTemperature', function(req, res) {
        var collection = db.get('temperature');
        collection.find({},{},function(e,docs){
            var json = "{\"temperature\":" + docs + "}";
            // res.send("{\"temperature\":",
            //     docs, "}"
            // );
            res.send({
                "temperatures" : docs
            });
        });
    });

};
