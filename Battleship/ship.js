// Ship Class Properties
// length: size of the ship (int)
// hit: number of times the ship has been hit (int)
// sunk: true if the ship is sunk (boolean)
// direction: orientation of the ship ('horizontal' or 'vertical')
// id: unique identifier for the ship (int or string)

class Ship {
  constructor(id, startPositon, lengths = 3) {
    this.position = startPositon;
    this.length = lengths;
    this.hitCount = 0;
    this.sunk = false;
    this.direction = "horizontal";
    this.id = id;
  }

  // ClassMethods
  setDirection(direction) {
    // setDirection(direction): sets the ship's direction ('horizontal' or 'vertical')
    this.direction = direction;
  }

  hit() {
    // hit(): registers a hit on the ship
    this.hitCount += 1; //this.hits = this.hits +1
    if (this.hitCount >= this.length) {
      this.sunk = true;
    }
  }

  isSunk() {
    // isSunk(): returns true if the number of hits equals the ship's length
    return this.sunk;
  }
}

export default Ship; // Exportiere die Klasse als Default
