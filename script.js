document.addEventListener('DOMContentLoaded', () => {
    const postsListDiv = document.getElementById('posts-list');
    const singlePostDiv = document.getElementById('single-post');
    const API_URL = 'http://localhost:3000';

    // Show the list of posts and hide the single post view
    function showPostsList() {
        postsListDiv.classList.remove('hidden');
        singlePostDiv.classList.add('hidden');
        loadPostExtracts();
    }

    // Fetch and display post extracts
    async function loadPostExtracts() {
        try {
            const response = await fetch(`${API_URL}/api/posts`);
            const posts = await response.json();
            postsListDiv.innerHTML = '<h2>Articoli</h2>';
            posts.data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post-extract';
                postElement.innerHTML = `
                    <h3>${post.titolo}</h3>
                    <p>${post.estratto}</p>
                    <button class="read-more-btn" data-id="${post.id}">Leggi di più</button>
                `;
                postsListDiv.appendChild(postElement);
            });
        } catch (error) {
            postsListDiv.innerHTML = '<p>Errore nel caricamento degli articoli.</p>';
            console.error(error);
        }
    }

    // Fetch and display a single full post
    async function loadSinglePost(id) {
        try {
            const response = await fetch(`${API_URL}/api/posts/${id}`);
            const post = await response.json();
            singlePostDiv.innerHTML = `
                <div class="full-post">
                    <h2>${post.titolo}</h2>
                    <p><em>di ${post.autore}</em></p>
                    <p>${post.contenuto}</p>
                    <button class="back-btn">Torna alla lista</button>
                </div>
            `;
            postsListDiv.classList.add('hidden');
            singlePostDiv.classList.remove('hidden');
            
            singlePostDiv.querySelector('.back-btn').addEventListener('click', showPostsList);
        } catch (error) {
            console.error('Errore nel caricamento dell\'articolo:', error);
        }
    }

    // Event delegation for "Leggi di più" buttons
    postsListDiv.addEventListener('click', (event) => {
        if (event.target.classList.contains('read-more-btn')) {
            const postId = event.target.dataset.id;
            loadSinglePost(postId);
        }
    });

    // Initial load
    showPostsList();
});