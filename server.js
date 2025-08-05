const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware per servire i file statici dalla cartella 'public'
app.use(express.static('public'));

// Funzione helper per leggere i dati
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

// Endpoint GET /boxes: restituisce la lista dei box
app.get('/boxes', (req, res) => {
    res.json(readData());
});

// Endpoint GET /reverse: restituisce la lista dei box in ordine inverso
app.get('/reverse', (req, res) => {
    const data = readData();
    const reversedData = [];
    // Ciclo for per invertire l'array come richiesto
    for (let i = data.length - 1; i >= 0; i--) {
        reversedData.push(data[i]);
    }
    res.json(reversedData);
});

app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});