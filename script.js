document.addEventListener('DOMContentLoaded', () => {

    const taskContainer = document.getElementById('task-container');

    // Funzione per renderizzare la lista di attività sulla pagina
    const renderTasks = (tasks) => {
        taskContainer.innerHTML = ''; // Pulisce il contenitore prima di aggiungere i nuovi elementi

        tasks.forEach(task => {
            const card = document.createElement('div');
            card.className = 'task-card';

            const text = document.createElement('p');
            text.textContent = task.text;

            const button = document.createElement('button');
            button.textContent = 'Completa';
            button.dataset.id = task.id; // Salva l'ID sul pulsante per un facile recupero

            // Applica stili e disabilita il pulsante se l'attività è completata
            if (task.completed) {
                card.classList.add('completed');
                button.disabled = true; 
            }
            
            card.appendChild(text);
            card.appendChild(button);
            taskContainer.appendChild(card);
        });
    };

    // 4) Carica la lista delle attività all'avvio della pagina
    const loadTasks = async () => {
        try {
            const response = await fetch('/tasks'); // Richiesta GET
            const tasks = await response.json();
            renderTasks(tasks); // Visualizza le attività
        } catch (error) {
            console.error('Errore nel caricamento delle attività:', error);
        }
    };

    // Listener per il click sui pulsanti "Completa" (usando event delegation)
    taskContainer.addEventListener('click', async (event) => {
        // Controlla se l'elemento cliccato è un pulsante non disabilitato
        if (event.target.tagName === 'BUTTON' && !event.target.disabled) {
            const taskId = event.target.dataset.id;

            try {
                // Invia la richiesta POST per completare l'attività [cite: 25]
                const response = await fetch(`/tasks/complete/${taskId}`, { method: 'POST' });
                const updatedTasks = await response.json();
                
                // Aggiorna la lista delle attività sulla pagina [cite: 26]
                renderTasks(updatedTasks);
            } catch (error) {
                console.error('Errore durante l\'aggiornamento dell\'attività:', error);
            }
        }
    });

    // Carica le attività all'avvio
    loadTasks();
});