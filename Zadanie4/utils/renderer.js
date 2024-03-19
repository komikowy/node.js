const fs = require('fs');

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

module.exports = { renderPage };
