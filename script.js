function showMovies(filmes){
    console.log(filmes);
    let p = document.createElement("p");
    p.textContent = JSON.stringify(filmes);
    document.body.appendChild(p);
}

let minhaLista = [];

function getMovies() {
    fetch('filmes.json')
    .then(response => response.json())
    .then(data => {
        filmes = data;
        displayMovies(filmes);
    })
        .catch((error) =>
            console.error("Unable to fetch data:", error));
}

function displayMovies(filmeList) {
    const filmesList = document.getElementById('listaDeFilmes');
    filmesList.innerHTML = '';
    filmeList.forEach(filme => {
        const filmeDiv = document.createElement('div');
        filmeDiv.classList.add('filme');
        filmeDiv.innerHTML = `
            <h3>${filme.titulo} (${filme.ano})</h3>
            <img src="${filme.poster}" alt="${filme.titulo} Poster">
            <p>Diretor: ${filme.diretor}</p>
            <p>Duração: ${filme.duracaoEmMinutos} minutos</p>
            <p>Gênero: ${filme.genero.join(', ')}</p>
            <button onclick="adicionarALista(${filmeList.indexOf(filme)})">Adicionar à Minha Lista</button>
            <button onclick="favoritarFilme(${filmeList.indexOf(filme)})">${filme.favorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}</button>
        `;
        filmesList.appendChild(filmeDiv);
    });
}

function buscarFilmes() {
    const termoBusca = document.getElementById('inputBusca').value.toLowerCase();
    const filmesFiltrados = filmes.filter(filme => filme.titulo.toLowerCase().includes(termoBusca));
    if (filmesFiltrados.length > 0) {
        displayMovies(filmesFiltrados);
        document.getElementById('btnVoltar').style.display = 'block';
    } else {
        alert('Nenhum filme encontrado.');
    }
}

function voltarLista() {
    getMovies();
    document.getElementById('btnVoltar').style.display = 'none';
}


function favoritarFilme(index) {
    filmes[index].favorito = !filmes[index].favorito;
    displayMovies(filmes);
}

function adicionarALista(index) {
    const filmeSelecionado = filmes[index];
    minhaLista.push(filmeSelecionado);
    exibirMinhaLista();
}

function exibirMinhaLista() {
    const minhaListaDiv = document.getElementById('minhaLista');
    minhaListaDiv.innerHTML = '';
    minhaLista.forEach((filme, index) => {
        const filmeDiv = document.createElement('div');
        filmeDiv.classList.add('filme');
        filmeDiv.innerHTML = `
            <h3>${filme.titulo} (${filme.ano})</h3>
            <img src="${filme.poster}" alt="${filme.titulo} Poster">
            <p>Diretor: ${filme.diretor}</p>
            <p>Duração: ${filme.duracaoEmMinutos} minutos</p>
            <p>Gênero: ${filme.genero.join(', ')}</p>
            <button onclick="removerDaLista(${index})">Remover</button>
        `;
        minhaListaDiv.appendChild(filmeDiv);
    });
}

function removerDaLista(index) {
    minhaLista.splice(index, 1);
    exibirMinhaLista();
}
