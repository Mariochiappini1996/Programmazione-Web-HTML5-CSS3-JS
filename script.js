document.addEventListener('DOMContentLoaded', () => {

    // Consistent API URL, matching the Node.js server port from the exam (5500)
    const apiUrl = 'http://localhost:3000/persone';

    // --- Hamburger Menu Toggle (from Question 3 requirement for functionality) ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('nav.menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        document.addEventListener('click', (event) => {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
        hamburger.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                navMenu.classList.toggle('active');
                event.preventDefault();
            }
        });
}
    // --- Question 4: Fetch and Display Data ---
    async function load() {
        const res = await fetch("http://localhost:3000/api/persone");
        const resp_json = await res.json();
        const persone = resp_json.data;

        const listaPersone = document.getElementsByClassName("col-left")[0].getElementsByClassName("lista-persone");
        console.log(listaPersone);
        const ul = document.createElement("ul");
        persone.forEach((element) => {
            const li = document.createElement("li");
            li.innerHTML = element.nome + " " + element.cognome;
            li.addEventListener("click", () => {
                alert(
                "Nome: " + element.nome + " " + element.cognome + ",Età: " + element.età
            );
        });
        li.style.cursor = "pointer";
        ul.appendChild(li);
        });
        listaPersone[0].appendChild(ul);
    }
    load(); // [cite: 10]
    // --- Question 5: Update Colors ---
    // Corrected variable name to match HTML ID (camelCase) [cite: 7]
    const aggiornaColoriButton = document.getElementById('aggiornaColoriButton'); // [cite: 11]

    function aggiornaStileColori() { // [cite: 11]
        document.body.style.backgroundColor = '#00796b'; // [cite: 12]
        const menuLinks = document.querySelectorAll('nav.menu a');
        menuLinks.forEach(link => {
            link.style.color = '#313131'; // [cite: 12]
        });
    }

    if (aggiornaColoriButton) {
        aggiornaColoriButton.addEventListener('click', aggiornaStileColori); // [cite: 11]
    }
});