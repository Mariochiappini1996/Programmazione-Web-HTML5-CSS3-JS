const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(morgan("dev"));
app.use(express.json()); //for parsing application/json

app.use(cors()); // Enable CORS for all routes

app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory

const richiestaEsame = JSON.parse(fs.readFileSync(path.join(__dirname, "data.json")));

//app.get("/api/soloalcuniparametri", (req, res) => {
//    const richiesta1 = richiestaEsame.map(({Parametro1, Parametro2, Parametro3}) => ({Parametro1, Parametro2, Parametro3})); // mappa alcuni dati da mostrare
//    const variabile1_json = { status: "success", data: richiesta1, };
//        res.json(variabile1_json);
//});

app.get("/api/events", (req, res) => {

// Inserire richiesta server, esempio:
    const variabile_json = { status: "success", data: richiestaEsame, };
        res.json(variabile_json);
});

app.get("/api/partecipate/:id", (req, res) => {
    const id = req.params.id;
    const response = richiestaEsame.find((r) => r.id == id);
    if (!response) {
        return res.status(404).json({ status: "error", message: "Richiesta non trovata" });
    }
    else{
        const variabile_json = { status: "success", data: response };
        res.json(variabile_json);
    }
});

app.get("/api/Unico_parametro_senza_duplicazioni", (req, res) => {
    const Unico_parametro_senza_duplicazioni = [...new Set(richiestaEsame.map(tutto => tutto.parametro))]; // Extract unique genres
    const variabile2_json = { status: "success", data: Unico_parametro_senza_duplicazioni };
        res.json(variabile2_json);
});



// Endpoint POST /items/complete/:id
app.post('/items/complete/:id', (req, res) => {
    try {
        const items = richiestaEsame;
        const itemId = parseInt(req.params.id);

        const updatedItems = items.map(item => {
            if (item.id == itemId) {
                return { ...item, completato: true };
            }
            return item;
        });

        fs.writeFileSync(path.join(__dirname, "data.json"), JSON.stringify(updatedItems, null, 2), 'utf8');
        res.json({ status: "success", data: updatedItems });

    } catch (error) {
        console.error("Errore nell'endpoint POST /items/complete/:id:", error);
        res.status(500).json({ status: "error", message: "Errore interno del server durante l'aggiornamento.", error: error.message });
    }
});

// Endpoint GET /items-complete
app.get('/chiave-valore', (req, res) => {
    try {
        const items = richiestaEsame;
        res.json(items.filter(item => item.completato));
    } catch (error) {
        res.status(500).json({ message: "Errore nel leggere i dati.", error: error.message });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});