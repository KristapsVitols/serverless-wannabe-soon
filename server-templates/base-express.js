module.exports = `
const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('A user visited website!');
    console.log('IP Address: ' + req.ip);
    
    next();
});

app.get('/', (req, res) => {
    res.send('It is working!');
});

app.listen(3333, () => console.log('Server up on 3000'));
`;