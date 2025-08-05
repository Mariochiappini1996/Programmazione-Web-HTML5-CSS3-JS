document.addEventListener("DOMContentLoaded", () => {

    // Elementi per la navigazione mobile (hamburger)
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const navLinks = document.getElementById('nav-links');

    
    function Load() {
    fetch("/api/tutto")
        .then(response => response.json())
        .then(data => {
            // Qui puoi gestire i dati ricevuti, ad esempio:
            console.log(data);
            // Puoi anche aggiornare il DOM con i dati
        })
        .catch(error => {
            console.error("Errore nel caricamento dei dati:", error);
        });
}
Load();

    // Mostra/nasconde il menu di navigazione su mobile
    function toggleMenu() {
        if (navLinks) {
            navLinks.classList.toggle('show');
        }
    }
});