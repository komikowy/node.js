const http = require('http');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/home') {
        renderPage('home', res);
    } else if (req.url === '/student') {
        renderPage('student', res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

function renderPage(pageName, res) {
    fs.readFile(`./views/${pageName}.html`, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('500 Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data.replace(/NAZWA_PLIKU/g, pageName.toUpperCase()));
        }
    });
}
