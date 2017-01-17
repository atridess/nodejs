// https://github.com/buckyroberts/Source-Code-from-Tutorials/blob/master/Node.js/013_NodeJs/server.js
// https://www.youtube.com/watch?v=pYOltVz7kL0&index=13&list=PL6gx4Cwl9DGBMdkKFn3HasZnnAqVjzHn_

var http = require("http");
var listenPort = 8888;

//This is the callback method, is called every time a user makes a request
//Request object has info about their request, response object is what we send back to them
function onRequest(request, response) {
    console.log("A user made a request" + request.url);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("I am a simple Node server!");
    response.end();
}

//Create a server and listen for requests on this port
http.createServer(onRequest).listen(listenPort);
console.log("Server is now running and listening port: " + listenPort);

//Now open Chrome and go to http://localhost:8888
//Saying that user made request twice because browser also makes a request for the favicon