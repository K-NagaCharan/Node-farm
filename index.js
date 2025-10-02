const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');


const replaceTemlate = (temp , product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if(!product.organic)
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
}

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    // const pathName = req.url;
    const {query, pathname} = url.parse(req.url, true);


    //overview apge
    if(pathname === "/" || pathname === "/overview") {
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardsHtml = dataObj.map(ele => replaceTemlate(tempCard, ele)).join("");
        // console.log(cardsHtml);
        const output = tempOverview.replace("{%PRODUCT_CARD%}", cardsHtml);
        res.end(output);
    }

    //product page
    else if(pathname === "/product") {
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemlate(tempProduct, product);
        res.end(output);
    }

    //api's
    else if(pathname === "/api") {
        res.writeHead(200, {'Content-type': 'application/json'});
        res.end(data);
    }

    //not found
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