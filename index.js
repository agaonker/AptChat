var express = require("express");
var app = express();
var port = 3700;

//following are the setting for using the jade template engine
app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

//socket.io integration
app.use(express.static(__dirname + '/public'));

var io = require('socket.io').listen(app.listen(port));


io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the AptChat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

 
app.get("/", function(req, res){
    res.render("page");
});
 

console.log("Listening on port " + port);