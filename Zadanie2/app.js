const http = require('http');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/home') {
        renderForm(res);
    } else if (req.url === '/student') {
        renderPage('student', res);
    } else if (req.url === '/submit' && req.method === 'POST') {
        handleFormSubmission(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

function renderForm(res) {
    fs.readFile('./views/home.html', 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('500 Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
}

function renderPage(pageName, res) {
    fs.readFile(`./views/${pageName}.html`, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('500 Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
}

function handleFormSubmission(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        console.log('Received form data:', body);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Form submitted successfully!</h1>');
    });
}
