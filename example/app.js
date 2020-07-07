const http = require('http');

const server = http.createServer((req, res) => {
    console.log('INCOMING REQUEST');
    console.log(req.method, req.url);
    
    res.end('<h1>Success!</h1>');
});

server.listen(5000);