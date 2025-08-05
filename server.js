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

const prodotti = JSON.parse(fs.readFileSync(path.join(__dirname, "data.json")));

app.get("/api/products", (req, res) => {

 const variabile_json = { status: "success", data: prodotti, };
    res.json(variabile_json);
});

app.get("/api/products/:id", (req, res) => {
    const id = req.params.id;
    const response = prodotti.find((r) => r.id == id);
    if (!response) {
        return res.status(404).json({ status: "error", message: "Richiesta non trovata" });
    }
    else{
        const variabile_json = { status: "success", data: response };
        res.json(variabile_json);
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});