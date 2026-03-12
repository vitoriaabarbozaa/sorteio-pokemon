const botao = document.getElementById("btn-sortear");
const container = document.getElementById("pokemon-container");

const MAX_POKEMON = 1025;

botao.addEventListener("click", sortearPokemon);

function sortearPokemon(){

let numero = Math.floor(Math.random() * MAX_POKEMON) + 1;

container.innerHTML = "Buscando Pokémon...";

fetch("https://pokeapi.co/api/v2/pokemon/" + numero)

.then(function(resposta){
return resposta.json();
})

.then(function(dados){

mostrarPokemon(dados);

});

}

function mostrarPokemon(pokemon){

let imagem = pokemon.sprites.other["official-artwork"].front_default;

if(!imagem){
imagem = pokemon.sprites.front_default;
}

let tipos = "";

for(let i = 0; i < pokemon.types.length; i++){
tipos += "<span class='type'>" + pokemon.types[i].type.name + "</span>";
}

let habilidades = "";

for(let i = 0; i < pokemon.abilities.length; i++){

habilidades += pokemon.abilities[i].ability.name;

if(i < pokemon.abilities.length - 1){
habilidades += ", ";
}

}

let stats = "";

for(let i = 0; i < pokemon.stats.length; i++){

stats += "<div>";
stats += "<span>" + pokemon.stats[i].stat.name + "</span>";
stats += "<span>" + pokemon.stats[i].base_stat + "</span>";
stats += "</div>";

}

let altura = (pokemon.height / 10).toFixed(2);
let peso = (pokemon.weight / 10).toFixed(2);

container.innerHTML = `
<div class="card">

<img src="${imagem}" alt="${pokemon.name}">

<h2>${pokemon.name}</h2>
<p>Nº ${pokemon.id}</p>

<div class="types">
${tipos}
</div>

<div class="info">
Altura: ${altura} m <br>
Peso: ${peso} kg <br>
Habilidades: ${habilidades}
</div>

<div class="stats">
${stats}
</div>

<audio controls src="${pokemon.cries.latest}"></audio>

</div>
`;

}