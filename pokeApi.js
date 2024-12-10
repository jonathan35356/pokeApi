const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
let currentPage = 1;

const fetchPokemon = async (page) => {
    const limit = 20;
    const offset = (page - 1) * limit;
    const response = await fetch(`${apiUrl}?limit=${limit}&offset=${offset}`);
    const data = await response.json();

    const container = document.getElementById('pokemon-container');
    container.innerHTML = '';

    for (const pokemon of data.results) {
        const pokeResponse = await fetch(pokemon.url);
        const pokeData = await pokeResponse.json();

        const card = `
            <div class="pokemon-card">
                <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
                <h3>${pokeData.name}</h3>
                <p>Status: ${pokeData.stats[0].base_stat}</p>
                <p>Type: ${pokeData.types[0].type.name}</p>
            </div>`;
        container.innerHTML += card;
    }

    document.getElementById('prev').disabled = page === 1;
};

document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 1) {
        fetchPokemon(--currentPage);
    }
});

document.getElementById('next').addEventListener('click', () => {
    fetchPokemon(++currentPage);
});

fetchPokemon(currentPage);
