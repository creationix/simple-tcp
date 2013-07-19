tcp.createServer(8080, function (socket) {
  console.log("SERVER: New client connected");
  socket.sink(socket, function (err) {
    if (err) throw err;
    console.log("SERVER: Client disconnected");
  });
});
console.log("TCP echo server listening at localhost:8080");


var data = new Buffer("Hello World!\n");
var each = require('simple-stream-helpers/each.js');
var binarySource = require('simple-stream-helpers/binary-source.js');

tcp.connect(8080, function (socket) {
  each(socket, function (chunk) {
    console.log("CLIENT:", chunk);
  })(function (err) {
    if (err) throw err;
    console.log("CLIENT: Done");
  });
  console.log("CLIENT: Sending data");
  socket.sink(binarySource(data, 7))(function (err) {
    if (err) throw err;
    console.log("CLIENT: Server is done with data");
  });
});
