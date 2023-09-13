//TATETI
// Variables para controlar el juego
let turno = true; // Controla de quién es el turno (true para X, false para O)
let jugar = true; // Indica si el juego está en curso (true) o ha terminado (false)
let resetear = false; // Verifica si se debe reiniciar el juego
let arr = []; // Almacena los movimientos de los jugadores
let oportunidades = 9; // Lleva un registro de los movimientos restantes (comienza en 9)

// Agregar eventos de clic a elementos con la clase "numero"
document.querySelectorAll('.numero').forEach(i =>
  i.addEventListener('click', e => {
    tateti(e);
  })
);

// Función principal que maneja el juego cuando se hace clic en una celda
function tateti(ev) {
  switch (turno) {
    case true:
      if (
        ev.target.innerHTML != 'X' &&
        ev.target.innerHTML != 'O' &&
        jugar == true
      ) {
        ev.target.innerHTML = 'X';
        turno = false;
        pintar(ev, 'X');
        unTurnomenos();
        preguntarSiGano(ev, 'X');
      }
      break;
    case false:
      if (
        ev.target.innerHTML != 'X' &&
        ev.target.innerHTML != 'O' &&
        jugar == true
      ) {
        ev.target.innerHTML = 'O';
        turno = true;
        pintar(ev, 'O');
        unTurnomenos();
        preguntarSiGano(ev, 'O');
      }
      break;
  }
}

// Función para reducir el número de movimientos restantes
function unTurnomenos() {
  oportunidades -= 1;
  if (oportunidades == 0) {
    oportunidades = 9;
        // Agrega un botón de reinicio cuando se agotan los movimientos
    document.getElementById('resultado').innerHTML +=
      "<button id='reiniciar'>Reiniciar</button>";
    document
      .getElementById('reiniciar')
      .addEventListener('click', () => reiniciar());
  }
}

// Función para verificar si un jugador ha ganado
function preguntarSiGano(ev, XO) {
  arr[ev.target.attributes.valor.value] = XO;

  if (arr[0] == `${XO}` && arr[1] == `${XO}` && arr[2] == `${XO}`) gano(XO);
  if (arr[3] == `${XO}` && arr[4] == `${XO}` && arr[5] == `${XO}`) gano(XO);
  if (arr[6] == `${XO}` && arr[7] == `${XO}` && arr[8] == `${XO}`) gano(XO);
  if (arr[0] == `${XO}` && arr[3] == `${XO}` && arr[6] == `${XO}`) gano(XO);
  if (arr[1] == `${XO}` && arr[4] == `${XO}` && arr[7] == `${XO}`) gano(XO);
  if (arr[2] == `${XO}` && arr[5] == `${XO}` && arr[8] == `${XO}`) gano(XO);
  if (arr[0] == `${XO}` && arr[4] == `${XO}` && arr[8] == `${XO}`) gano(XO);
  if (arr[2] == `${XO}` && arr[4] == `${XO}` && arr[6] == `${XO}`) gano(XO);

  //comprueba si hay empate
}

// Función para cambiar el color de la celda
function pintar(ev, color) {
  document
    .getElementById(ev.target.attributes.valor.value)
    .setAttribute('color', `${color}`);
}

// Función para declarar un ganador y finalizar el juego
function gano(XO) {
  jugar = false;
  oportunidades = 9;

  document.getElementById('resultado').innerHTML = `'${XO}' ¡Ha el ganado!`;
  document.getElementById('resultado').innerHTML +=
    "<button id='reiniciar'>Reiniciar</button>";
  document
    .getElementById('reiniciar')
    .addEventListener('click', () => reiniciar());
}

// Muestra el mensaje de victoria y un botón de reinicio
function reiniciar() {
  //arreglar i
  for (let i = 0; i < 9; i++) {
    document.getElementById(i).innerHTML = '+';
    document.getElementById(i).setAttribute('color', '');
    arr[i] = '';
  }

// Función para reiniciar el juego
  document.getElementById('resultado').innerHTML = '';
  jugar = true;
}
