class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
    this.board = null; //Each player has a gameboard. Definded in game.js

    /*
    Create Gameboard directly
    When creating new instances, be cautious about naming conventions, 
    especially if there are dependencies on HTML IDs. If you are using the name directly, 
    consider appending a string like "BoardID" to ensure uniqueness and prevent conflicts in the DOM.

    Alternative: this.board = new Gameboard(this, `${name.toLowerCase()}BoardID`);

    Current: game.js > this.humanPlayer = new Player("Human"); 
    */
  }

  //Declaration of boards for each player (not necessary if instance "Player" create gameboard directly)
  setBoard(board) {
    this.board = board;
  }

  //Attack method
  attack(opponentBoard, x, y) {
    if (!this.isComputer) {
      console.log(`${this.name} attacks at (${x}, ${y})`);
      opponentBoard.receiveAttack(x, y);
    } //ELSE
    this.computerAttack(opponentBoard); //Random KI-Attack
  }

  //Random KI-Attack
  computerAttack(opponentBoard) {
    const boardSize = opponentBoard.boardSize;
    let x, y;

    do {
      x = Math.floor(Math.random() * boardSize);
      y = Math.floor(Math.random() * boardSize);
    } while (opponentBoard.board[y][x] !== null); //Make sure that AI attack doen´t hit fields that have already been attacked

    console.log(`Computer attacks at (${x}, ${y})`);
    opponentBoard.receiveAttack(x, y);
  }
}

export default Player;
