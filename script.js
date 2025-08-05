document.addEventListener('DOMContentLoaded', () => {
    const counterValueElement = document.getElementById('counter-value');
    const increaseBtn = document.getElementById('increment-button');
    const decreaseBtn = document.getElementById('decrement-button');
    const changeColorsBtn = document.getElementById('reset-button');
    const pageHeader = document.getElementById('header');
    const pageFooter = document.getElementById('footer');
    const hamburgerIcon = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    const API_BASE_URL = 'http://localhost:3000'; // Assicurati che corrisponda alla porta del tuo server Node.js

    // Funzione per aggiornare il valore del contatore nella pagina
    function updateCounterDisplay(value) {
        counterValueElement.textContent = value;
    }

    // 1. Contatore: Al caricamento della pagina, visualizzare il valore iniziale [cite: 10]
    async function fetchInitialCounter() {
        try {
            const response = await fetch(`${API_BASE_URL}/counter`); // GET request
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`);
            }
            const data = await response.json();
            updateCounterDisplay(data.counter); // [cite: 10]
        } catch (error) {
            console.error('Errore nel caricamento del contatore:', error);
            counterValueElement.textContent = 'Errore';
        }
    }

    // 2. Aggiornamento del contatore al click dei bottoni [cite: 10]
    async function updateCounter(action) {
        try {
            const response = await fetch(`${API_BASE_URL}/${action}`, { // 'increase' o 'decrease'
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`);
            }
            const data = await response.json();
            updateCounterDisplay(data.counter); // Aggiorna il valore visibile [cite: 10]
        } catch (error) {
            console.error(`Errore durante l'azione ${action}:`, error);
        }
    }

    increaseBtn.addEventListener('click', () => updateCounter('increase'));
    decreaseBtn.addEventListener('click', () => updateCounter('decrease'));

    // 3. Cambiamento dei colori al click del bottone [cite: 11]
    async function fetchAndApplyColors() {
        try {
            const response = await fetch(`${API_BASE_URL}/colors`); // GET request [cite: 11]
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`);
            }
            const colors = await response.json();
            // Modifica dinamica dei colori dell'header e del footer [cite: 11]
            pageHeader.style.backgroundColor = colors.background;
            pageHeader.style.color = colors.text;
            // Anche i link nel nav e il titolo nell'header dovrebbero cambiare colore di testo
            pageHeader.querySelectorAll('a').forEach(a => a.style.color = colors.text);
            pageHeader.querySelector('h1').style.color = colors.text;
            // Colore dell'icona hamburger se visibile
            hamburgerIcon.querySelectorAll('div').forEach(div => div.style.backgroundColor = colors.text);


            pageFooter.style.backgroundColor = colors.background;
            pageFooter.style.color = colors.text;
        } catch (error) {
            console.error('Errore nel caricamento dei colori:', error);
        }
    }

    changeColorsBtn.addEventListener('click', fetchAndApplyColors);

    // Gestione menu hamburger
    hamburgerIcon.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Carica il valore iniziale del contatore
    fetchInitialCounter();
});