const http = require('http');
const fs = require('fs');
const { handleHome, handleStudent } = require('./routes/index');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/home') {
        handleHome(req, res);
    } else if (req.url === '/student') {
        handleStudent(req, res);
    } else if (req.url === '/submit' && req.method === 'POST') {
        handleFormSubmission(req, res);
    } else {
        handleNotFound(req, res);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

function handleNotFound(req, res) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404 Not Found');
}

function handleFormSubmission(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        console.log('Received form data:', body);
        res.writeHead(302, { 'Location': '/student' });
        res.end();
    });
}
