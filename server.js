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

// Funzione helper per scrivere i task sul file
const writeTasksToFile = (events) => {
    fs.writeFileSync(richiestaEsame, JSON.stringify(events, null, 2), 'utf8');
};

app.get("/api/events", (req, res) => {
    const variabile_json = { status: "success", data: richiestaEsame, };
        res.json(variabile_json);
});



//app.get("/api/soloalcuniparametri", (req, res) => {
//    const richiesta1 = richiestaEsame.map(({Parametro1, Parametro2, Parametro3}) => ({Parametro1, Parametro2, Parametro3})); // mappa alcuni dati da mostrare
//    const variabile1_json = { status: "success", data: richiesta1, };
//        res.json(variabile1_json);
//});



app.get("/api/partecipate/:id", (req, res) => {
    const id = req.params.id;
    const member = req.params.partecipanti;
    const response = richiestaEsame.find((r) => r.id == id);
    if (!response) {
        return res.status(404).json({ status: "error", message: "Richiesta non trovata" });
    }
    else{
        const variabile_json = { status: "success", data: response };
        res.json(variabile_json);
    }

    const member1 = richiestaEsame.map(({partecipanti}) => ({partecipanti}));
    const variabilemember_json = {status: "success", data: member1, };
        res.json(variabilemember_json);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});