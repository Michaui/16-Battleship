import Ship from "./ship.js";
import Game from "./game.js";

// Gameboard Class Properties
class Gameboard {
  constructor(player, boardID, boardSize = 9) {
    this.player = player; //Declartion gameboard for human and computer player
    this.boardElement = document.getElementById(boardID); // boardElement: declaration board
    this.boardSize = boardSize; // sizeX, sizeY: dimensions of the board (int)
    this.board = Array.from({ length: this.boardSize }, () =>
      Array(this.boardSize).fill(null)); //create boardgame this.board[x=column][y=row]
    this.squares = []; //is an array used to store references to the DOM elements (squares) of the game board, enabling dynamic control of their state and appearance in the UI.
    this.ships = this.createShips(); //create ships by initialize gameboard
    this.missedAttack = []; //coordinates of missed attacks (array of [x, y])
    /*this.drawMap(); //Draw Map after initialize new Class immediately.
    > current: game.startGame() -> this.humanBoard.drawMap();*/
  }


  //CLASS METHODS
  // drawMap(): renders the gameboard visually one time each player
  drawMap() {
    // this.boardElement.innerHTML = ""; Only nescessery if you call drawMap as class method again:
    this.boardElement.style.gridTemplateColumns = `repeat(${this.boardSize}, 1fr)`; //Rows defined by method loops

    for (let col = 0; col < this.boardSize; col++) {
      for (let row = 0; row < this.boardSize; row++) {
        // console.log(`Drawing map for ${this.player}`);
        const square = document.createElement("div");
        square.classList.add("square");
        square.dataset.row = row;  //Gebe jedem Div eine row ID 
        square.dataset.col = col;  //Gebe jedem Div eine col ID
        // square.style.width = "50px"; square.style.height = "50px"; //Defined by SCSS.
        this.boardElement.appendChild(square);
        this.squares.push(square);
      }
    }

    if (this.boardElement.id == 'computerBoardID') { //<div id="computerBoardID"></div>
      this.boardElement.style.display = 'none'; //Disable Computerboard
    }
  }


  //getDrawedSquare: Nehme aus dem drawMap die richtige Kachel 
  //Nächste Methode drawShip() und zeichne darauf das schiff? 
  //getSquare(row, col){
  //return this.squares.find(square => square.dataset.row == row && square.dataset.col == col); 
  //}

  //create ships for gameboard
  createShips() {
    /* const ships = [new Ship ...] return ships instead of return [...]
      
      USE: If the array of ship objects should to be reused or accessed later (.map, .filter, .find, ...)
        const shipLengths = ships.map(ship => ship.length); // Show length from ships
        console.log(shipLengths); // Ausgabe: [5, 4, 3, 2]
  
        const foundShip = ships.find(ship => ship.id === 2); // Search ship with ID === 2 
        console.log(foundShip); // Ausgabe: Ship { id: 2, length: 4 }
    */
    return [
      new Ship(0, "destroyer", 5),
      new Ship(1, "submarine", 4),
      new Ship(2, "battleship", 3),
      new Ship(3, "carrier", 2)
    ];
  }


  //Place ship on boardgame
  placeShip(ship, x, y) {
    if (this.canPlaceShip(ship, x, y)) { //Check if true
      const { shipLength, direction } = ship; //Hole die Attribute aus dem Objekt: 3 horizontal und speicher sie in die Variablen  shipLength und direction. 

      ship.setPosition(x, y); // Set the starting position of the ship instance/object

      if (direction === "horizontal") {
        for (let i = 0; i < shipLength; i++) {
          /*Set the ship horizontally:
          The ship object is not copied or instantiated three times! 
          Instead, each of the shipLength positions in the board array is REFERENCED to the same ship object.*/
          this.board[x][y + i] = ship;
          this.drawShipSquare(x, y + i);
        }
      } else if (direction === "vertical") {
        for (let i = 0; i < shipLength; i++) {
          this.board[x + i][y] = ship; // Set the ship vertically
          this.drawShipSquare(x + i, y);
        }
      }
      // console.log(this.board)
    }
  }

  // Check if a ship can be placed on the board
  canPlaceShip(ship, x, y) {
    const { shipLength, direction } = ship; // Extrahierung: wie z.B.: const shipLength = ship.shipLength; 

    if (direction === "horizontal") {
      if (y + shipLength > this.boardSize) return false; // Out of bounds
      for (let i = 0; i < shipLength; i++) {
        if (this.board[x][y + i] !== null) return false; // Collision detected
      }
    } else { //(direction === "vertical")
      if (x + shipLength > this.boardSize) return false; // Out of bounds
      for (let i = 0; i < shipLength; i++) {
        if (this.board[x + i][y] !== null) return false; // Collision detected
      }
    }
    return true; // No collision, can place ship
  }

  drawShipSquare(x, y) { //------ADD UI FOR PLACING A SHIP!!!!!!!
    const square = this.findShipSquare(x, y);
    square.classList.add("ship");
  }

  findShipSquare(x, y) { //------ADD UI FOR PLACING A SHIP
    return this.squares.find((sq) => sq.dataset.row == (y) && sq.dataset.col == (x));
  }


  //FLIP-METHODS
  // flipShip(ship) { //Ohne Hilfe 
  //   const { direction, shipLength, position } = ship; 
  //   let [x, y] = position; 

  //   if (direction === "horizontal") {
  //     // if (this.canPlaceShip(ship, x, y)) {
  //       for (let i = 0; i < shipLength; i++) {  // Entferne das Schiff von der alten Position
  //         if (this.board[x][y + i] === ship) {
  //           this.board[x][y + i] = null;
  //           this.deleteShipSquare(x, y + i); 
  //         }
  //       // }
  //       ship.direction = "vertical"; 
  //       this.placeShip(ship, x, y);
  //     }
  //   } else {
  //     // if (this.canPlaceShip(ship, x, y)) {
  //       for (let i = 0; i < shipLength; i++) { // Entferne das Schiff von der alten Position
  //         if (this.board[x + i][y] === ship) {
  //           this.board[x + i][y] = null;
  //           this.deleteShipSquare(x + i, y); 
  //         }
  //       // }

  //       ship.direction = "horizontal";
  //       this.placeShip(ship, x, y);
  //     }
  //   } 
  // }

  flipShip(ship) {
    // this.deleteShip(ship); Wird VIELLEICHT RELEVANT BEI EINZELFLIPS, wenn das Schiff nicht vorher gelöscht wird. 
    let [x, y] = ship.position;

    if (this.canFlipShip(ship, x, y)) { // Versuche neues Schiff zu platzieren
      this.deleteShip(ship);
      this.changeDirection(ship);
      this.placeShip(ship, x, y);
      this.ships.forEach((ship) => { this.showFlipSquare(ship) });
    } else {
      console.warn("Feedback: Cannot flip ship");
    }
  }

  canFlipShip(ship) {
    const [x, y] = ship.position; // Position des Schiffs
    const originalDirection = ship.direction;
    const shipLength = ship.shipLength;
    let canFlip = false;

    this.changeDirection(ship);

    // Berechne die neuen Positionen, die das Schiff nach dem Drehen einnehmen würde
    if (ship.direction === "horizontal") {
      if (y + shipLength <= this.boardSize) {
        canFlip = true;
        for (let i = 0; i < shipLength; i++) {
          if (this.board[x][y + i] !== null && !(x === ship.position[0] && y + i === ship.position[1])) {
            canFlip = false; // Überprüfe, ob die Position bereits belegt ist, außer der Startposition
            break; //Verlassen der Schleife, sobald in dem If-Condition false gesetzt wurde. 
          }
        }
      }
    } else if (ship.direction === "vertical") {
      if (x + shipLength <= this.boardSize) {
        canFlip = true;
        for (let i = 0; i < shipLength; i++) {
          if (this.board[x + i][y] !== null && !(x + i === ship.position[0] && y === ship.position[1])) {
            canFlip = false;  // Überprüfe, ob die Position bereits belegt ist, außer der Startposition
            break;
          }
        }
      }
    }

    ship.direction = originalDirection; // Stelle die ursprüngliche Richtung wieder her
    return canFlip; // Gib zurück, ob das Schiff gedreht werden kann
  }

  showFlipSquare(ship) {
    if (this.canFlipShip(ship)) {
      this.drawFlipSquare(ship); // Feedback, wenn drehbar
    } else {
      this.removeFlipSquare(ship);
    }
  }

  drawFlipSquare(ship) {
    const square = this.findShipSquare(ship.position[0], ship.position[1]);
    square.classList.add("flip");
    square.onclick = () => this.flipShip(ship);

  }

  removeFlipSquare(ship) {
    const square = this.findShipSquare(ship.position[0], ship.position[1]);
    square.classList.remove("flip");
    square.onclick = null; // Entferne das Klickverhalten
  }

  deleteShip(ship) {
    const { shipLength, direction, position } = ship;
    let [x, y] = position;

    for (let i = 0; i < shipLength; i++) { // Entferne aktuelles Schiff
      const oldX = direction === "horizontal" ? x : x + i;
      const oldY = direction === "horizontal" ? y + i : y;
      this.board[oldX][oldY] = null;
      this.deleteShipSquare(oldX, oldY);
    }
  }

  deleteShipSquare(x, y) {
    const square = this.findShipSquare(x, y);
    square.classList.remove("ship");
  }

  changeDirection(ship) {
    const newDirection = ship.direction === "horizontal" ? "vertical" : "horizontal";
    // console.log(`Changing direction from ${ship.direction} to ${newDirection}`);
    ship.direction = newDirection;
  }


  flipAllShips() {
    this.ships.forEach((ship) => {
      this.flipShip(ship);
    });
  }


  //Place ships randomly
  placeShipsRandomly(ships) {
    console.log(ships);
    ships.forEach((ship) => {
      let placed = false;

      while (!placed) {
        const direction = Math.random() < 0.5 ? "vertical" : "horizontal";
        ship.direction = direction;
        const x = Math.floor(Math.random() * this.boardSize); //Fehler -> this.boardSize, statt this.board.boardSize
        const y = Math.floor(Math.random() * this.boardSize);

        if (this.canPlaceShip(ship, x, y)) {
          this.placeShip(ship, x, y);
          console.log(`Ship ${ship.id} placed successfully at (${x}, ${y}) with direction ${direction}!`);
          placed = true;
        }
      }
    });
    // console.log(this.board)
  }


  //handles an attack on the board, checks if a ship is hit
  receiveAttack(x, y) { //Wird aufgerufen mit player.gameboard.receiveAttack(x,y).
    //if (this.board[y][x] !== null) {

    const target = this.board[y][x]; //gameboard y,x VS. graph x,y
    // target: {id: 1, shipLength: 3, direction: "horizontal", position: [2, 5],}

    if (target !== null) {
      const ship = target; //Set target as ship aka Object einfach mit this.board[y][x] herausholen?????????????????????????

      const hitPosition = ship.direction === "horizontal"
        ? x - ship.position[0] //y, x: Abfrage der Position des Objekt Ships ship.position[0] (x-Kooridnate, weil sich nur bei Horizonzale die Zahl ändert "changes"; y-Koordinate bleibt konstant, weil sich die Höhe nicht ändert), heißt ship.position [x-Position] beziehungsweise überschreiben von this.position = null; oder ship.position = [x=2, y=3]
        : y - ship.position[1]; //y, x: Abfrage der Position des Objekt Ships ship.position[1] (y-Koordinate, weil sich nur bei Vertikal die Zahl ändert "changes"; x-Koordinate bleibt konstant, weil sich die breite nicht ändert), heißt ship.position [y-Position] beziehungsweise überschreiben von this.position = null; 
      /* 
      The line ship.position[0] is set in the placeShip() method when the ship is positioned by: 
      placeShip(ship, x, y){... ship.setPosition([x, y]) ...}
      -> ? Calculate based on startposition (x,y) and hit position for horizontal ship (y constant, x changes) -> startpositionX - hitPositionX = shipPart 1-n
      -> : Else calculate based on startposition (x,y) and hit position for vertical ship (y changes, x constant) -> startpositionY - hitPositionY = shipPart 1-n
      
      Beispiel: Horizontale Platzierung
        Schiffsposition: ship.position = [2, 3] (Startpunkt: x=2, y=3)
        Schiffslänge: 3 Felder gesetzt mit Ship.position: (1Feld:[2, 3]; 2Feld:[2, 3]; 3Feld:[2, 3])
        Aktueller Treffer: x = 4, y = 3 (Zelle, auf die geschossen wird)
        Wenn das Schiff horizontal liegt, interessiert uns die x-Koordinate.
    
        Berechnung:
        hitPosition = x - ship.position[0]; // 4 - 2 = 2
      */

      ship.hit(hitPosition); // Call the hit method with relative hit position (1-n)
      console.log(`Hit at (${x}, ${y}) on ship part ${hitPosition}!`);

      // Update UI: Mark the square red for a hit
      //------- Warum kann hier einfach this.board stehen? ???????????????????????
      //------- obwohl vielleicht nicht klar ist welcher Spieler dran ist?????????
      const square = this.squares.find(
        (sq) => sq.dataset.row == y && sq.dataset.col == x
      );
      square.classList.add("hit"); //------ADD CSS CLASS FOR HIT!!!!!!!

      if (ship.isSunk()) {
        //check if ship has been hit completely
        console.log(`Ship with ID ${ship.id} has been sunk!`);
      }
    } else {
      this.recordMissedAttack(x, y);
      console.log(`Missed attack at (${x}, ${y})!`);
      // Update UI: Mark the square blue for a missed attack
      const square = this.squares.find(
        (sq) => sq.dataset.row == y && sq.dataset.col == x
      );
      square.classList.add("missed"); // Add CSS class for missed attack (blue)
    }

    // Check if all ships are sunk
    if (this.isAllShipsSunk()) {
      console.log(`${this.player} has lost!`);
      alert(`${this.player} has lost!`);
    }
  }

  recordMissedAttack(x, y) {
    //stores missed attack coordinates
    //Optional
    //const alreadyMissed = this.missedAttack.some(([missX, missY]) => missX === x && missY === y);

    // if (!alreadyMissed) {
    this.missedAttack.push([x, y]);
    console.log(`Missed attack recorded at ${x}, ${y}`);
    // } else {
    // console.log(`Attack already missed at (${x}, ${y})`);
    // }
  }

  // isAllShipsSunk(): checks if all ships on the board are sunk
  isAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk()); //check each ship if method: isSunk is true. 
  }
}

export default Gameboard;