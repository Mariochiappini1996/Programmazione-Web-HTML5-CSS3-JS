document.addEventListener('DOMContentLoaded', () => {
    const eventsGrid = document.getElementById('events-grid');
    const themeLightBtn = document.getElementById('theme-light');
    const themeDarkBtn = document.getElementById('theme-dark');
    const API_URL = 'http://localhost:3000';
    let allEvents = []; // Cache all events to filter on the client-side

    // Function to render events
    function renderevents(events) {
        eventsGrid.innerHTML = '';
        events.data.forEach(movie => {
            const poster = document.createElement('div');
            poster.className = 'movie-poster';
            poster.innerHTML = `<span>${movie.nome} (${movie.data})(${movie.luogo})(${movie.partecipanti})</span>;
            <button class ="partecipa-btn">Partecipa</button>`;
            poster.querySelector('.partecipa-btn').addEventListener('click', () => {
            alert(`Partecipanti: ${movie.partecipanti}`);    
            });
            eventsGrid.appendChild(poster);
        });
        
    }
    // Load all events and setup filters
    async function initialize() {
        try {
            // Fetch events
            const eventsResponse = await fetch(`${API_URL}/api/events`);
            const allEvents = await eventsResponse.json();
            renderevents(allEvents);
                        
        } catch (error) {
            eventsGrid.innerHTML = '<p>Error loading data.</p>';
            console.error(error);
        }
    }
// Listener per il cambio tema
    themeDarkBtn.addEventListener('click', (e) => { e.preventDefault(); document.body.classList.add('dark-theme'); });
    themeLightBtn.addEventListener('click', (e) => { e.preventDefault(); document.body.classList.remove('dark-theme'); });
    initialize();
});