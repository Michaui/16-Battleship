//import { hit } from './ship.js';
import Ship from './ship.js';
import Gameboard from './gameboard.js';

//TESTS MIT JEST (Expect & Tobe)

// capitalize
// test('capitalizes the first character of a string', () => {
//   expect(capitalize('hello')).toBe('Hello');
//   expect(capitalize('world')).toBe('World');
//   expect(capitalize('')).toBe('');
// });

test('ship is placed after check "Cab place ship" to board regarding to ship.length', () => {
  const gameboard = new Gameboard("playerA", "playerid");

  const ship = gameboard.ships[3]; //Get: Carrier mit Länge 2
  // ship.setPosition([0, 0]); //direction default "horizontal"
  gameboard.placeShip(ship, 0, 0);

  // Prüfe, ob die Board-Felder gesetzt wurden
  expect(gameboard.board[0][0]).toBe(ship);  // Erstes Feld des Schiffs
  expect(gameboard.board[0][1]).toBe(ship);  // Zweites Feld des Schiffs

  // Prüfe, ob das nächste Feld leer ist
  expect(gameboard.board[0][2]).toBeNull();  // Feld nach dem Schiff

  // Prüfen, ob das zweite Schiff **nicht** platziert werden kann
  const shipZwei = gameboard.ships[2]; 
  const canPlace = gameboard.canPlaceShip(shipZwei,0,0); 
  expect(canPlace).toBe(false); 
});


test('Set ships randomly', () => {
  const gameboard = new Gameboard("playerA", "playerid");
  gameboard.placeShipsRandomly(gameboard.ships);
  gameboard.ships.forEach(ship => {
    // expect(ship.position).not.toEqual([]);  // Position sollte nicht mehr ein leeres Array sein
  expect(ship.position).not.toEqual([]);
  });
})



test('ship sunks after enough hits', () => {
  const ship = new Ship(2, "battleship", 3) //Initalisiere erstes Schiff
  ship.hit(0); //Treffer 1
  ship.hit(1); //Treffer 1
  expect(ship.isSunk()).toBe(false);
  ship.hit(2); //Treffer 3
  expect(ship.isSunk()).toBe(true);
});

// const ship = new Ship(1, [0, 0], 3) //Initalisiere erstes Schiff