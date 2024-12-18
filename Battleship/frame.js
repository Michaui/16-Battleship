import Ship from "./ship.js";
import Gameboard from "./gameboard.js";

//Collect all ships under shipContainer after button selector
// const container = document.querySelector('#shipContainer'); //select first
// const shipContainer = container.querySelectorAll('div'); //select all divs in shipContainer and return as array



// const flipBtn = document.querySelector('.flipBtn');
// const startBtn = document.querySelector('.startBtn');


let angle = '0'
function flip() {
    // console.log(shipContainer.children); Do not work because of flipBtn. Just want ship Divs. 
    //const optionShips = (Array.from(shipContainer)); //returns all 4 ship divs and set it as array. 
    //optionShips.forEach(optionShip => optionShip.style.transform = `rotate(90deg)`);
    angle = angle === '0' ? '90' : '0';

    /*
    angle ===: Weil nach einem bestimmten Wert hinterfragt wird und nicht nur true/false; 
    
    angle = angle === condition ? valueIfTrue : valueIfFalse
    Wenn die Bedingung angle === '0' wahr ist, wird valueIfTrue ('90') zurückgegeben.
    Wenn die Bedingung falsch ist, wird valueIfFalse ('0') zurückgegeben.
    */
   
/*  if (angle === '0'){shipContainer.style.width = '100px'}
    else {shipContainer.style.width = '200px'}; */
    
    shipContainer.forEach((ship) => { //shipContainer is an array. 
        ship.style.transform = `rotate(${angle}deg)`; // Drehe jedes Schiff
      }); 
}

//flipBtn.addEventListener('click', flip); 


