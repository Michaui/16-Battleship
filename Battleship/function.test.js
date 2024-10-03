//import { hit } from './ship.js';
import Ship from './ship.js';

//TESTS MIT JEST (Expect & Tobe)

// capitalize
// test('capitalizes the first character of a string', () => {
//   expect(capitalize('hello')).toBe('Hello');
//   expect(capitalize('world')).toBe('World');
//   expect(capitalize('')).toBe('');
// });


//Ship
test('ship sunks after enough hits', () => {
  const ship = new Ship(1, [0, 0], 3) //Initalisiere erstes Schiff
  ship.hit(); //Treffer 1
  ship.hit(); //Treffer 2  
  expect(ship.isSunk()).toBe(false);
  ship.hit(); //Treffer 3
  expect(ship.isSunk()).toBe(true);
});
