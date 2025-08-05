document.addEventListener('DOMContentLoaded', () => {

    const boxContainer = document.getElementById('box-container');
    const reverseBtn = document.getElementById('reverse-btn');

    // Funzione riutilizzabile per visualizzare i box
    const displayBoxes = (boxes) => {
        boxContainer.innerHTML = ''; // Pulisce il contenitore
        boxes.forEach(box => {
            const boxDiv = document.createElement('div');
            boxDiv.className = 'color-box';
            boxDiv.style.backgroundColor = box.colore;
            boxDiv.textContent = box.titolo;
            boxContainer.appendChild(boxDiv);
        });
    };

    // 3) Carica i dati all'avvio della pagina
    const loadInitialData = async () => {
        try {
            const response = await fetch('/boxes');
            const data = await response.json();
            displayBoxes(data);
        } catch (error) {
            console.error('Errore nel caricamento iniziale:', error);
        }
    };

    // 5) Funzione al click del pulsante per invertire l'ordine
    reverseBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/reverse'); // Chiama l'endpoint /reverse
            const reversedData = await response.json();
            displayBoxes(reversedData); // Aggiorna la pagina con i dati invertiti
        } catch (error) {
            console.error('Errore nel caricamento invertito:', error);
        }
    });

    // Avvia il caricamento iniziale
    loadInitialData();
});