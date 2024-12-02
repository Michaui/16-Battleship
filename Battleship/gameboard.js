import Ship from "./ship.js";

// Gameboard Class Properties
class Gameboard {
  constructor(player, boardID, boardSize = 10) {
    this.player = player; //Declartion gameboard for human and computer player
    this.boardElement = document.getElementById(boardID); // boardElement: declaration board
    this.boardSize = boardSize; // sizeX, sizeY: dimensions of the board (int)
    //-------- Warum wird hier length: als attribut gesetzt??????????????
    this.board = Array.from({ length: this.boardSize }, () =>
      Array(this.boardSize).fill(null)
    ); //create boardgame
    this.squares = []; //define boardElement squares for UI
    //this.ships = []; //list of ships on the board (array of Ship objects)
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

  //??????
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
      new Ship(1, 5), //(id,length)
      new Ship(2, 4),
      new Ship(3, 3),
      new Ship(4, 2),
    ];
  }

  // Check if a ship can be placed on the board
  canPlaceShip(ship, x, y) {
    // Extrahierung: wie z.B.: const shipLength = ship.shipLength; 
    const { shipLength, direction } = ship;

    if (direction === "horizontal") {
      if (x + shipLength > this.boardSize) return false; // Out of bounds
      for (let i = 0; i < shipLength; i++) {
        if (this.board[y][x + i] !== null) return false; // Collision detected
      }
    } //(direction === "vertical")
    else {
      if (y + shipLength > this.boardSize) return false; // Out of bounds
      for (let i = 0; i < shipLength; i++) {
        if (this.board[y + i][x] !== null) return false; // Collision detected
      }
    }

    return true; // No collision, can place ship
  }

  //Place ship on boardgame: main.js event
  placeShip(ship, x, y) {
    if (this.canPlaceShip(ship, x, y)) {
      //Verhlaten this. klören! Woher weiß welches Board dran ist.?????????
      const { shipLength, direction } = ship; //WAS PASSIERT HIER??????????????????????????

      ship.setPosition([x, y]); // Set the starting position of the ship instance/object
      ship.direction = direction; // Ensure direction is set correctly

      if (direction === "horizontal") {
        for (let i = 0; i < shipLength; i++) {
          /*Set the ship horizontally:
          The ship object is not copied or instantiated three times! 
          Instead, each of the shipLength positions in the board array is REFERENCED to the same ship object.*/
          this.board[y][x + i] = ship;
        }
      } else if (direction === "vertical") {
        for (let i = 0; i < shipLength; i++) {
          this.board[y + i][x] = ship; // Set the ship vertically
        }
      }

      if (!this.ships.includes(ship)) {
        // Check if the ship is already in the list before pushing it (includes)
        this.ships.push(ship); // Add ship to the list of ships if not already added
      }
    } else {
      console.error("Cannot place ship here!");
    }
    //------ADD UI FOR PLACING A SHIP!!!!!!!
  }

  //Place ships randomly for computer player
  placeShipsRandomly(ships) {
    ships.forEach((ship) => {
      let placed = false;

      while (!placed) {
        const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
        const x = Math.floor(Math.random() * this.board.boardSize);
        const y = Math.floor(Math.random() * this.board.boardSize);
        ship.setRandomDirection();

        if (this.board.canPlaceShip(ship, x, y)) {
          this.board.placeShip(ship, x, y);
          placed = true;
        }
      }
    });
  }

  //updateSquare() // Update square

  //handles an attack on the board, checks if a ship is hit
  receiveAttack(x, y) {
    //if (this.board[y][x] !== null) {

    //------- Warum kann hier einfach this.board stehen? ???????????????????????
    //------- obwohl vielleicht nicht klar ist welcher Spieler dran ist?????????
    //------- Und warum funktiniert this.board[y][x] für target zur Überorpfüng: Warum kein () oder [,]?????????
    //------- board ist doch ein Array im Array, warum geht dann this.board[y][x]
    const target = this.board[y][x]; //gameboard y,x VS. graph x,y

    if (target !== null) {
      const ship = target; //Set target as ship aka Object einfach mit this.board[y][x] herausholen?????????????????????????
      // const ship = this.board[y][x]; // Get the ship object

      const hitPosition =
        ship.direction === "horizontal"
          ? x - ship.position[0]
          : y - ship.position[1];
      /* 
      The line ship.position[0] is set in the placeShip() method when the ship is positioned by: 
      placeShip(ship, x, y){... ship.setPosition([x, y]) ...}
      -> ? Calculate based on startposition (x,y) and hit position for horizontal ship (y constant, x changes) -> startpositionX - hitPositionX = shipPart 1-n
      -> : Else calculate based on startposition (x,y) and hit position for vertical ship (y changes, x constant) -> startpositionY - hitPositionY = shipPart 1-n
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
    } else {
      // change to next player
      game.switchTurn();
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
