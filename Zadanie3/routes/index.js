const fs = require('fs');

function handleHome(req, res) {
    renderPage('home', res);
}

function handleStudent(req, res) {
    renderPage('student', res);
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

module.exports = { handleHome, handleStudent };
