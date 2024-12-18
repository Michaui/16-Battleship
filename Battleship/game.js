import Player from "./player.js";
import Gameboard from "./gameboard.js";


  //WENNS FUNKTIONIERT ZU FRAME.JS EXPORTTIEREN 
  const flipBtn = document.querySelector('.flipBtn');

class Game {
  constructor() {
    //Player
    this.currentPlayer = "human"; //Current player
    this.humanPlayer = new Player("Human");
    this.computerPlayer = new Player("Computer", true);
    //this.ships = this.createShips(); 

    //Setup board for each player (Gameboard is known to its player, but the player is not known to human/-computerboard)
    this.humanBoard = new Gameboard(this.humanPlayer, "humanBoardID"); //<div id="humanBoardID"></div>
    this.computerBoard = new Gameboard(this.computerPlayer, "computerBoardID"); //<div id="computerBoardID"></div>

    flipBtn.addEventListener('click', () => this.humanBoard.flipAllShips());

    /** Declaration board for each player (erstmal nicht notwendig, da Zuweisung schon bei Gameboard passiert).
     * Würde bei Gameboard nicht der Spieler zugewiesen werden, wäre "setBoard" notwendig!
    */
    // this.humanPlayer.setBoard(this.humanBoard);
    // this.computerPlayer.setBoard(this.computerBoard);
  }

  /*
  Alternative

  Constructor(){...
  this.ships = this.createShips();}

  assignShipsToPlayer(humanPlayer, computerPlayer) {
    humanPlayer.board.placeShipsRandomly([...this.ships]);
    computerPlayer.board.placeShipsRandomly([...this.ships]);
  }

  createShips() {
      return [
        new Ship(1, 5), //(id,length)
        new Ship(2, 4),
        new Ship(3, 3),
        new Ship(4, 2),
      ];
    }
  */

  // Start game
  startGame() {
    // this.updateTurnDisplay(); 
    this.humanBoard.drawMap(); // draw board for human player
    this.computerBoard.drawMap(); // draw board for computer player
    this.humanBoard.placeShipsRandomly(this.humanBoard.ships); // draw board for computer player
    // this.computerBoard.placeShipsRandomly(this.computerBoard.ships); // draw board for computer player
  }


  switchTurn() {
    this.currentPlayer = this.currentPlayer === "human" ? "computer" : "human";
    this.updateTurnDisplay();
  }

  updateTurnDisplay() {   //show current player
    const displayElement = document.getElementById("turnDisplay");
    displayElement.textContent = `It's ${this.currentPlayer}'s turn!`;
  }

  // Handle attack based on the current player
  handleAttack(x, y) {
    if (this.currentPlayer === "human") {
      //Human player attacks computer -> Pass computerplayer.board aka. Gameboard-Class
      //this.humanPlayer.attack(this.computerPlayer.board, x, y); //VARIANTE 01 (mit setBoard-Funktion)
      //VS: 
      this.humanPlayer.attack(computerBoard.board, x, y) //VARIANTE 02
    } else {
      this.computerPlayer.attack(this.humanPlayer.board);
    }

  flipBtn.addEventListener('click', () => {
    this.humanBoard.flipAllShips(); 
  });

  } 
}




export default Game;