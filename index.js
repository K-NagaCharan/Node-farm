const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const pathName = req.url;

    if(pathName === "/" || pathName === "/overview") {
        res.end("Overview");
    }
    else if(pathName === "/product") {
        res.end("Product");
    }
    else if(pathName === "/api") {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end("<h1>Page not found!</h1>");
    }
})

// console.log(text);

server.listen(8000);