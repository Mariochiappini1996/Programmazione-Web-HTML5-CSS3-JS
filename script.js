document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal');

    // Controllo di robustezza: verifica subito se l'elemento principale esiste.
    if (!productGrid) {
        console.error("Errore Critico: Elemento con id 'product-grid' non trovato. Controlla il file index.html.");
        return; // Interrompe lo script per prevenire altri errori.
    }

    const API_URL = 'http://localhost:3000';

    async function loadProducts() {
        try {
            const response = await fetch(`${API_URL}/api/products`);
            // Controlla se la richiesta fetch ha avuto successo
            if (!response.ok) {
                throw new Error(`Errore di rete o dal server: ${response.status}`);
            }
            const resp_json = await response.json();
            const products = resp_json.data; // Assumendo che i prodotti siano in resp_json.data
            console.log("Prodotti caricati:", products); // Debug: mostra i prodotti caricati
            productGrid.innerHTML = ''; // Svuota la griglia prima di riempirla

            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.dataset.id = product.id;
                card.innerHTML = `
                    <h3>${product.nome}</h3>
                    <p>€ ${product.prezzo.toFixed(2)}</p>
                `;
                card.addEventListener('click', () => showProductDetails(product.id));
                productGrid.appendChild(card);
            });
        } catch (error) {
            // Grazie al controllo iniziale, ora sappiamo che se si arriva qui
            // l'errore è quasi certamente dovuto alla rete o al server.
            productGrid.innerHTML = `<p style="color: red; text-align: center;">Impossibile caricare i prodotti. <br>Assicurati che il server Node.js sia in esecuzione sulla porta 3000.</p>`;
            console.error("Dettagli dell'errore:", error);
        }
    }

    async function showProductDetails(id) {
        try {
            const response = await fetch(`${API_URL}/api/products/${id}`);
            console.log(response)
            if (!response.ok) {
                throw new Error(`Errore di rete o dal server: ${response.status}`);
            }
            const product = await response.json();
            console.log("Dettagli del prodotto:", product); // Debug: mostra i dettagli del prodotto
            modalContent.innerHTML = `
                <h2>${product.data.nome}</h2>
                <img src="placeholder.png" alt="${product.data.nome}" style="max-width:100%; border-radius:8px;">
                <p><strong>Prezzo:</strong> € ${product.data.prezzo.toFixed(2)}</p>
            `;
            modalOverlay.classList.remove('hidden');
            modalContainer.classList.remove('hidden');
        } catch (error) {
            console.error('Errore nel caricamento dei dettagli:', error);
        }
    }

    function closeModal() {
        modalOverlay.classList.add('hidden');
        modalContainer.classList.add('hidden');
    }

    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    loadProducts();
});