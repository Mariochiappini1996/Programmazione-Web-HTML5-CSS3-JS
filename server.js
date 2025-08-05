const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory
app.use(morgan("dev"));
const DATA_FILE = path.join(__dirname, 'data.json');

function readArticles() {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
}

// GET /articoli -> tutti gli articoli
app.get('/articoli', (req, res) => {
    const articles = readArticles();
    res.json(articles);
});

// GET /autori -> elenco unico degli autori
app.get('/autori', (req, res) => {
    const articles = readArticles();
    const autori = [...new Set(articles.map(a => a.autore))];
    res.json(autori);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});