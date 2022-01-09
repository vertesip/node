const http = require("http");
const fs = require("fs");
const url = require('url');
const path = require('path');
const port = process.env.PORT || 3000;

let server = http.createServer((request, response) => {

    let filePath = path.join(
        __dirname,
        request.url === "/" ? "index.html" : request.url);

    let extName = path.extname(filePath);
    let contentType = 'text/html';

    if (extName == '.html') {
        filePath = path.join(
            __dirname,
            'views',
            request.url === "/" ? "index.html" : request.url);
    } else {
        filePath = path.join(
            __dirname,
            request.url === "/" ? "index.html" : request.url);
    }

    switch (extName) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }


    console.log(`File path: ${filePath}`);
    console.log(`Content-Type: ${contentType}`)

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(response);

});

server.listen(port);