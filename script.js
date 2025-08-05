document.addEventListener('DOMContentLoaded', () => {

    const activityListContainer = document.getElementById('activity-list');
    const showAllBtn = document.getElementById('show-all');
    const showCompletedBtn = document.getElementById('show-completed');
    const themeLightBtn = document.getElementById('theme-light');
    const themeDarkBtn = document.getElementById('theme-dark');

    // Funzione riutilizzabile per caricare e visualizzare i dati da un endpoint
    const fetchAndDisplay = async (endpoint = '/items') => {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) throw new Error('Errore di rete o del server.');
            
            const items = await response.json();
            activityListContainer.innerHTML = '';

            items.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'activity-item';

                const textP = document.createElement('p');
                textP.textContent = item.testo;

                const completeBtn = document.createElement('button');
                completeBtn.textContent = 'Completa';
                completeBtn.dataset.id = item.id; // Assicura che l'ID sia sempre presente

                if (item.completato) {
                    textP.classList.add('completed');
                    completeBtn.disabled = true;
                }

                itemDiv.appendChild(textP);
                itemDiv.appendChild(completeBtn);
                activityListContainer.appendChild(itemDiv);
            });
        } catch (error) {
            console.error("Errore in fetchAndDisplay:", error);
            activityListContainer.innerHTML = `<p>Impossibile caricare i dati: ${error.message}</p>`;
        }
    };

    // Listener per completare un'attività
    activityListContainer.addEventListener('click', async (event) => {
        if (event.target.tagName === 'BUTTON' && event.target.dataset.id) {
            const itemId = event.target.dataset.id;
            try {
                const response = await fetch(`/items/complete/${itemId}`, { method: 'POST' });
                if (!response.ok) throw new Error('La richiesta di aggiornamento è fallita.');
                
                const updatedItems = await response.json();
                fetchAndDisplay(); // Ricarica la lista completa per mostrare la modifica

            } catch (error) {
                console.error("Errore durante l'aggiornamento:", error);
            }
        }
    });

    // Listener per i pulsanti di filtro
    showAllBtn.addEventListener('click', () => fetchAndDisplay('/items'));
    showCompletedBtn.addEventListener('click', () => fetchAndDisplay('/items-complete'));

    // Listener per il cambio tema
    themeDarkBtn.addEventListener('click', (e) => { e.preventDefault(); document.body.classList.add('dark-theme'); });
    themeLightBtn.addEventListener('click', (e) => { e.preventDefault(); document.body.classList.remove('dark-theme'); });

    // Caricamento iniziale
    fetchAndDisplay();
});