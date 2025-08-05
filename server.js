const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// Serve i file statici dalla cartella 'public'
app.use(express.static('public'));

// Funzioni helper per leggere e scrivere i dati in modo sicuro
const readData = () => {
    // Controlla se il file esiste prima di leggerlo
    if (!fs.existsSync(DATA_FILE)) {
        throw new Error('File data.json non trovato!');
    }
    const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(fileContent);
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};

// Endpoint GET /items
app.get('/items', (req, res) => {
    try {
        res.json(readData());
    } catch (error) {
        res.status(500).json({ message: "Errore nel leggere i dati.", error: error.message });
    }
});

// Endpoint GET /items-complete
app.get('/items-complete', (req, res) => {
    try {
        const items = readData();
        res.json(items.filter(item => item.completato));
    } catch (error) {
        res.status(500).json({ message: "Errore nel leggere i dati.", error: error.message });
    }
});

// Endpoint POST /items/complete/:id
app.post('/items/complete/:id', (req, res) => {
    try {
        const items = readData();
        const itemId = parseInt(req.params.id);

        const updatedItems = items.map(item => {
            if (item.id === itemId) {
                return { ...item, completato: true };
            }
            return item;
        });

        writeData(updatedItems);
        res.json(updatedItems);

    } catch (error) {
        console.error("Errore nell'endpoint POST /items/complete/:id:", error);
        res.status(500).json({ message: "Errore interno del server durante l'aggiornamento.", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});