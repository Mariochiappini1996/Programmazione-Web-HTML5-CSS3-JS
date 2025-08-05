const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const TASKS_FILE = path.join(__dirname, 'data.json');

// Middleware per servire i file statici (HTML, CSS, JS del client)
app.use(express.static('public'));

// Funzione helper per leggere i task dal file
const readTasksFromFile = () => {
    const data = fs.readFileSync(TASKS_FILE, 'utf8');
    return JSON.parse(data);
};

// Funzione helper per scrivere i task sul file
const writeTasksToFile = (tasks) => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
};

// Endpoint GET /tasks: Restituisce la lista delle attività. [cite: 12]
app.get('/tasks', (req, res) => {
    const tasks = readTasksFromFile();
    res.json(tasks);
});

// Endpoint POST /tasks/complete/:id: Contrassegna un'attività come completata. [cite: 12]
app.post('/tasks/complete/:id', (req, res) => {
    const tasks = readTasksFromFile();
    const taskId = parseInt(req.params.id, 10);

    const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = true;
        }
        return task;
    });

    writeTasksToFile(updatedTasks); // Salva le modifiche nel file
    res.json(updatedTasks); // Ritorna l'array modificato [cite: 12]
});

app.listen(PORT, () => {
    console.log(`Server in ascolto su http://localhost:${PORT}`);
});