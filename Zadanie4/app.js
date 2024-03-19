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
        const formData = parseFormData(body);
        console.log('Parsed form data:', formData);
        renderPage('student', res, formData);
    });
}


function parseFormData(formDataString) {
    const formData = {};
    formDataString.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        formData[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return formData;
}

function renderPage(pageName, res, formData) {
    fs.readFile(`./views/${pageName}.html`, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('500 Internal Server Error');
        } else {
            const formattedData = formatFormData(formData);
            const renderedPage = data.replace(/<%= (\w+) %>/g, (match, p1) => formattedData[p1] || match);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(renderedPage);
            saveFormData(formData);
        }
    });
}

function formatFormData(formData) {
    return {
        'code': formData.code,
        'name': formData.name,
        'lastname': formData.lastname,
        'gender': formData.gender,
        'age': formData.age,
        'studyField': formData.studyField
    };
}

function saveFormData(formData) {
    const fileName = `${formData.code}.txt`;
    const fileContent = `Numer albumu: ${formData.code}\nImię: ${formData.name}\nNazwisko: ${formData.lastname}\nPłeć: ${formData.gender}\nWiek: ${formData.age}\nKierunek: ${formData.studyField}`;
    fs.writeFile(`./${fileName}`, fileContent, (err) => {
        if (err) {
            console.error('Error saving form data:', err);
        } else {
            console.log(`Form data saved to file: ${fileName}`);
        }
    });
}
