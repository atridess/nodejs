//  https://github.com/buckyroberts/Source-Code-from-Tutorials/blob/master/Node.js/014_NodeJs/server.js
//  https://www.youtube.com/watch?v=_D2w0voFlEk&list=PL6gx4Cwl9DGBMdkKFn3HasZnnAqVjzHn_&index=14

var http = require("http");
var path = require('path');
var fs = require("fs");

var listenPort = 8888;

//We will send them a 404 response if page doesn't exist
function send404Response(response){
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write("Error 404 - Page not found");
    response.end();
}

//Handle their request
function onRequest(request, response) {

    if( request.method == 'GET' ){
        var requestedFile = request.url;
        if(requestedFile == '/') 
            requestedFile = "/index.html";
        
        var filePath = "./public"+requestedFile;
        fs.stat(filePath, function(err){
            if(!err){
                var contentType;
                switch(path.extname(filePath)){
                    case '.htm':
                    case '.html':
                        contentType = "text/html";
                        break;
                    case '.css':
                        contentType = "text/css";
                        break;
                    case '.png':
                        contentType = "image/png";
                        break;
                    case '.jpg':
                    case '.jpeg':
                        contentType = "image/jpeg";
                        break;
                    case '.ico':
                        contentType = "image/x-icon";
                        break;
                    case '.js':
                        contentType = "application/javascript";
                        break;
                    case '.json':
                        contentType = "application/json";
                        break;
                    default:
                        contentType = "text/plain";
                        break;
                }
                response.writeHead(200, {"Content-Type": contentType});
                //Open file as readable stream, pipe stream to response object
                fs.createReadStream(filePath).pipe(response);
                console.log("[200: "+contentType+" ] "+filePath);
            }else{
                send404Response(response);
                console.log("[404:Not found] "+filePath);
            }
        })
        
    }else{
        send404Response(response);
    }

}

http.createServer(onRequest).listen(listenPort);
console.log("Server is now running and listening port: " + listenPort);

