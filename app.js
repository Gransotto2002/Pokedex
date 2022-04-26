const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const modal = document.getElementById('modal-container')
const modalImg = document.getElementById('modalImg')

const generatePokemonPromises = () => Array(150)
  .fill().map((_, index) => fetch(getPokemonUrl(index + 1))
  .then(response => response.json()))

const generateHTML = pokemons => pokemons.reduce((accumulator, {name, id, types, abilities}) => {
  const elementTypes = types
    .map(typeInfo => typeInfo.type.name)
  const abilityTypes = abilities
    .map(abilitiesInfo => abilitiesInfo.ability.name)
  var array = [`{id:${id}, name: '${name}', types: '${elementTypes[0]}', ability: '${abilityTypes[0]}'}`]

  accumulator += `
    <li class="card ${elementTypes[0]}">
    <img class="card-image" alt="${name}" 
    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" 
    onclick="openModal(${array})"> 
      <h2 class="card-title">${id}. ${name}</h2>
      <p class="card-subtitle">${elementTypes.join(' | ')}</p>
    </li>
  `
  return accumulator
}, '')

const inserPokemonsIntoPage = pokemons => {
  const ul = document.querySelector('[data-js="pokedex"]')
  ul.innerHTML = pokemons
}

const pokemonPromises = generatePokemonPromises()
Promise.all(pokemonPromises)
  .then(generateHTML)
  .then(inserPokemonsIntoPage)



openModal = array => {
  let modalName = document.getElementById('modal-name')
  let modalType = document.getElementById('modal-type')
  let modalAbilities = document.getElementById('abilities')


  modalName.innerHTML = `${array.id}. ${array.name}`.toUpperCase()
  modalType.innerHTML = 'Type: ' + `${array.types}`.toUpperCase()
  modalAbilities.innerHTML = 'Ability: ' + `${array.ability}`.toUpperCase()


  modal.style.opacity = '1'
  modal.style.pointerEvents = 'auto'
  modalImg.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${array.id}.png`)
}

const btn = document.getElementById('btn')

btn.addEventListener('click', () => {
  modal.style.opacity = '0'
  modal.style.pointerEvents = 'none'
})
