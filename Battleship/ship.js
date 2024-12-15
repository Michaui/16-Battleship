// Ship Class Properties
class Ship {
  constructor(id, name, shipLength = 3) {
    this.name = name;
    this.id = id; // id: unique identifier for the ship (int or string)
    this.position = []; 
    this.shipLength = shipLength; // length: size of the ship (int)
    this.hits = Array(shipLength).fill(false); // track hits on the ship [false,false,false] 
    this.sunk = false; // sunk: true if the ship is sunk (boolean)
    this.direction = "horizontal"; // orientation of the ship (default:'horizontal','vertical')
    this.previousPosition = []; 
  }

  // ClassMethods
  setPosition(x,y) {
    this.previousPosition = x,y; //Save previous as copy from this.position.
    this.position = [x, y];
    console.log(`sat on ${this.position}`)
  }

  hit(hitPosition) {
    if (hitPosition < this.shipLength) {
      //hitPosition must be smaller than the length of the ship in relation to the starting point: receiveAttack()
      this.hits[hitPosition] = true; //Declaration of hitted position from ship
      console.log(`Ship hit at position ${hitPosition}`);
    }
  }

  isSunk() {
    // isSunk(): returns true if the number of hits equals the ship's length
    return this.hits.every((hit) => hit === true); // checks if all positions are hit
  }

  changeDirection() {
    //change direction of ship´s
    this.direction =
      this.direction === "horizontal" ? "vertical" : "horizontal";
  }
}

export default Ship; // Exportiere die Klasse als Default
