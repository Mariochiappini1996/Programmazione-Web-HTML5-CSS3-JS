document.addEventListener('DOMContentLoaded', () => {

    // Riferimenti agli elementi del DOM
    const gallery = document.getElementById('gallery');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const descriptionBanner = document.getElementById('description-banner');
    const descriptionText = document.getElementById('description-text');
    
    // Variabili per gestire lo stato
    let allIds = [];
    let loadedCount = 0;

    // Funzione per caricare e mostrare 4 immagini
    const loadMorePics = () => {
        const idsToLoad = allIds.slice(loadedCount, loadedCount + 4); // Prende i prossimi 4 ID

        idsToLoad.forEach(id => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = id;
            link.dataset.id = id; // Salva l'ID per un facile recupero
            
            listItem.appendChild(link);
            gallery.appendChild(listItem);
        });

        loadedCount += idsToLoad.length; // Aggiorna il contatore

        // Nasconde il bottone se non ci sono più ID da caricare
        if (loadedCount >= allIds.length) {
            loadMoreBtn.classList.add('hidden');
        }
    };

    // 4) Funzione eseguita al caricamento della pagina
    const initializeGallery = async () => {
        try {
            const response = await fetch('/list'); // Chiama l'endpoint /list
            allIds = await response.json();
            loadMorePics(); // Carica i primi 4 quadrati
        } catch (error) {
            console.error("Errore nel caricamento della lista ID:", error);
        }
    };

    // 5) Funzione eseguita al click del bottone "Carica altre"
    loadMoreBtn.addEventListener('click', loadMorePics);

    // 6) Funzione che mostra la descrizione al click su un quadrato
    gallery.addEventListener('click', async (event) => {
        event.preventDefault(); // Impedisce al link di ricaricare la pagina
        
        if (event.target.tagName === 'A') {
            const id = event.target.dataset.id;
            try {
                const response = await fetch(`/pics/${id}`); // Chiama /pics/:id
                const pictureData = await response.json();
                
                if (response.ok) {
                    descriptionText.textContent = pictureData.desc; // Mostra la descrizione
                    descriptionBanner.classList.remove('hidden'); // Mostra il banner
                } else {
                    alert(pictureData.data.message);
                }
            } catch (error) {
                console.error("Errore nel caricamento della descrizione:", error);
            }
        }
    });

    // Nasconde il banner se si clicca su di esso
    descriptionBanner.addEventListener('click', () => {
        descriptionBanner.classList.add('hidden');
    });

    // Avvia tutto
    initializeGallery();
});