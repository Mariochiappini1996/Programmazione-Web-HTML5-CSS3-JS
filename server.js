const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Middleware per servire i file statici (HTML, CSS, JS) dalla cartella 'public'
app.use(express.static('public'));

// Funzione helper per leggere i dati dal file
const readData = () => JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

// Endpoint GET /list: restituisce solo la lista degli ID. [cite: 69]
app.get('/list', (req, res) => {
    try {
        const data = readData();
        const idList = data.map(item => item.id);
        res.json(idList);
    } catch (error) {
        res.status(500).json({ status: "error", message: "Errore interno del server." });
    }
});

// Endpoint GET /pics/:id: restituisce l'oggetto con l'ID specificato. [cite: 69]
app.get('/pics/:id', (req, res) => {
    try {
        const data = readData();
        const id = parseInt(req.params.id);
        const picture = data.find(p => p.id === id);

        if (picture) {
            res.json(picture);
        } else {
            // Messaggio di errore JSend se l'ID non esiste. [cite: 70]
            res.status(404).json({
                status: "fail",
                data: { message: `ID ${id} non trovato.` }
            });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Errore interno del server." });
    }
});

// Gestione URL non corretta con messaggio JSend. [cite: 70]
app.use((req, res) => {
    res.status(404).json({
        status: "fail",
        data: { message: "Endpoint non trovato." }
    });
});

app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});