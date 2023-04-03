const team1 = "Time 1"; // Define o nome do primeiro time
const team2 = "Time 2"; // Define o nome do segundo time

const selectClassTeam1 = document.querySelector('.team-1'); // Seleciona a região que mostra o nome do primeiro time
const selectClassTeam2 = document.querySelector('.team-2'); // Seleciona a região que mostra o nome do segundo time

const turnText = document.querySelector('#turnText'); // Seleciona a parte do título que onde aparecerá o nome do time da vez

function teamTurn() {
  let randomizator = Math.floor(Math.random()*10);
  let selectedTeam = randomizator <= 5 ? team1 : team2;
  turnText.innerText = `É a vez da equipe ${selectedTeam} Banir o mapa`;
  selectedTeam == team1 ? selectClassTeam1.classList.add('full-opacity') : selectClassTeam2.classList.add('full-opacity');
  return selectedTeam;
} // Escolhe aleatóriamente o time da vez e destaca a cor de fundo do time escolhido

let turn = teamTurn(); // Guarda o nome do time escolhido aleatóriamente

let mapPool = ["Train", "Mirage", "Cache", "Inferno", "Cobblestone"]; // Guarda a lista dos mapas disponíveis

const maps = document.querySelectorAll('.card'); // Seleciona os cards que mostrarão os mapas

function chooseMap(event) {

  turn == team1 ? (
    turn = team2,
    selectClassTeam2.classList.add('full-opacity'),
    selectClassTeam1.classList.remove('full-opacity')
  ) : (
    turn = team1,
    selectClassTeam1.classList.add('full-opacity'),
    selectClassTeam2.classList.remove('full-opacity')
  );

  turnText.innerText = `É a vez da equipe ${turn} Banir o mapa`;

  event.currentTarget.classList.add('selected');

  event.currentTarget.removeEventListener('click', chooseMap);

  event.currentTarget.querySelector('.accept').innerText = "Banned";

  const clickedMap = event.currentTarget.querySelector('.map-name').innerText;

  mapPool = mapPool.filter(map => map != clickedMap);

  if (mapPool.length == 1) {
    const decidedMap = document.querySelector('.card:not(.selected)');
    decidedMap.classList.add('picked');
    decidedMap.removeEventListener('click', chooseMap);
    decidedMap.classList.add('disable-hover');
    turnText.innerText=`O mapa da partida será ${mapPool[0]}`;
  }
} // Realiza a troca do nome do time da vez, destaca a cor do time da vez, marca os mapas selecionados e elege o mapa da partida


for (let index = 0; index < maps.length; index++) {
  maps[index].addEventListener('click', chooseMap)
} // Adiciona a funçao chooseMap a todos os cards que mostrarão os mapas

