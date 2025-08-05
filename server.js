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

const blog = JSON.parse(fs.readFileSync(path.join(__dirname, "data.json")));

app.get("/api/allposts", (req, res) => {
const variabile_json = { status: "success", data: blog, };
    res.json(variabile_json);
});

app.get("/api/posts", (req, res) => {
const richiesta1 = blog.map(({id, titolo, estratto}) => ({id, titolo, estratto}));
const variabile1_json = { status: "success", data: richiesta1, };
    res.json(variabile1_json);
});

app.get("/api/posts/:id", (req, res) => {
    const id = req.params.id;
    const response = blog.find((r) => r.id == id);
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