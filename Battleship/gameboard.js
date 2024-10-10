// Gameboard Class Properties
class Gameboard {
  constructor(player, boardID) {
    this.boardElement = document.getElementById(boardID);
    this.squares = [];
    this.player = player; //'human' or 'computer'
    this.boardSize = 10;
    this.ships = [];
    this.missedAttack = [];
    /*this.drawMap(); //Draw Map after initialize new Class immediately.
    > Get more flexibility (Re-Render) if you setup drawMap in main.js*/
  }

  // Class Methods
  drawMap() {
    // this.boardElement.innerHTML = ""; Only nescessery if you call drawMap as class method again:
    this.boardElement.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`; //Rows defined by method loops

    for (let row = 0; row < this.boardSize; row++) {
      for (let col = 0; col < this.boardSize; col++) {
        // console.log(`Drawing map for ${this.player}`);
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.row = row;
        square.dataset.col = col;
        // square.style.width = "50px"; //Defined by SCSS.
        // square.style.height = "50px";
        this.boardElement.appendChild(square);
        this.squares.push(square); //push square to squares array
      }
    }
  }

  // placeShip(ship, x, y, direction): places a ship on the board

  // receiveAttack(x, y): handles an attack on the board, checks if a ship is hit

  // isAllShipsSunk(): checks if all ships on the board are sunk

  // receiveAttack: Define attacks on gameboard

  recordMissedAttack(x, y) {
    this.missedAttack.push([x, y]);
    console.log(`Missed attack recorded at ${x}, ${y}`);
  }
}

export default Gameboard;
