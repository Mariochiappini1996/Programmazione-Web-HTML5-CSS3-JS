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

// const Richiesta = JSON.parse(fs.readFileSync(path.join(__dirname, "data.json"))); NON ABBIAMO UN FILE DATA JSON

let counter = 5; // Initialize a counter for requests
const HeadFootColors = {"background": "#882200", "text": "#44DDAA"}; // Colori fissi per l'intestazione e il piè di pagina

app.get("/counter", (req, res) => {
    res.json({ counter: counter });});

app.post("/increase", (req, res) => {
    counter++;
    res.json({ counter: counter });
});

app.post("/decrease", (req, res) => {
    counter--;
    res.json({ counter: counter });});


app.get("/colors", (req, res) => {
    res.json(HeadFootColors);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});