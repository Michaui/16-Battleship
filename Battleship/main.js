import "./style.scss";
import Game from "./game.js";
import "./frame.js";


const game = new Game(); // Create a new instance of the Game class
game.startGame(); // Start the game to initialize everything



// Assuming you have a reference to the game and squares
const squares = document.querySelectorAll(".square"); // Get all square elements

squares.forEach((square) => {
  square.addEventListener("click", () => {
    //Brauchen wir eine square.dataset.player?!
    const x = square.dataset.col; // Get coordinates
    const y = square.dataset.row;
    //game.handleAttack(x, y); // Call the attack method
  });
});
