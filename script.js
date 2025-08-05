const main = document.getElementById('main-content');
const showAutoriBtn = document.getElementById('show-autori');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const authorList = document.getElementById('author-list');
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

// Carica articoli
fetch('http://localhost:3000/articoli')
    .then(res => res.json())
    .then(articles => {
    articles.forEach(article => {
        const artEl = document.createElement('article');
        artEl.innerHTML = `
        <h3>${article.titolo}</h3>
        <p><em>di ${article.autore}</em></p>
        <p>${article.contenuto.substring(0, 50)}...</p>
        <button class ="details-btn"> Mostra dettagli </button>`;
        artEl.querySelector('.details-btn').addEventListener('click', () => {
        alert(`Titolo: ${article.titolo}\nAutore: ${article.autore}\nContenuto: lorem ipsum dolor sit amet, consectetur adipiscing elit. ${article.contenuto}`);
        });
        main.appendChild(artEl);
    });
    });

// Mostra autori in modale
showAutoriBtn.addEventListener('click', () => {
    fetch('http://localhost:3000/autori')
    .then(res => res.json())
    .then(autori => {
        authorList.innerHTML = '';
        autori.forEach(a => {
        const li = document.createElement('li');
        li.textContent = a;
        authorList.appendChild(li);
        });
        overlay.style.display = 'block';
        modal.style.display = 'block';
    });
});

// Chiudi modale
[overlay, closeModal].forEach(el => {
    el.addEventListener('click', () => {
    overlay.style.display = 'none';
    modal.style.display = 'none';
    });
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
    navList.classList.toggle('open');
});