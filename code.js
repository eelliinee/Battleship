var view = {
    // displays string message in messageArea
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    
    // place a miss in the grid
    displayMissed: function(loc) {
        var cell = document.getElementById(loc);
        cell.setAttribute("class", "miss");
    },

    // place a hit in the grid
    displayHit: function(loc) {
        var cell = document.getElementById(loc);
        cell.setAttribute("class", "hit");
    }
}

var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,

    ships:  [],
    placeShips: function() {
        for (var i = 0; i < this.numShips; i++) {
            // make object for one ship
            var ship = {
                locations: [],
                hits: [],
            }
            
            // get ship locations and enter them in ship
            ship.locations[0] = getShipLocNum(this.boardSize, this.shipLength) + getShipLocNum(this.boardSize, this.shipLength);

            // randomly decide vertical or horizontal ship
            if (Math.round(Math.random()) === 0) { // horizontal ship
                for (var j = 1; j < this.shipLength; j++) {
                    shipLocInt = parseInt(ship.locations[0], 10) + j;
                    ship.locations[j] = shipLocInt.toString();
                }
            } else { // vertical ship
                for (var j = 1; j < this.shipLength; j++) {
                    shipLocInt = parseInt(ship.locations[0], 10) + j*10;
                    ship.locations[j] = shipLocInt.toString();
                }
            }
            
            // set hits with empty string for ship length
            for (var j = 0; j < this.shipLength; j++) {
                ship.hits[j] = "";
            }

            // add ship in ships
            this.ships.push(ship);
        }
    },
    fire: function(guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];

            // determine if guess is in locations
            var index = ship.locations.indexOf(guess);
            
            // index is -1 if guess isn't in the array, so when we have a hit:
            if (index >= 0) {
                ship.hits[index]= "hit";
                view.displayHit(guess);
                view.displayMessage("HIT!");

                // sink ship when all locations are hit
                if (this.isSunk(ship)) {
                    view.displayMessage("You sank my battleship!");

                    this.shipsSunk++;
                }
            
                return true; 
            }
        }
        // when not in locations, it's not a hit
        view.displayMissed(guess);
        view.displayMessage("You missed");
        return false;
    },
    isSunk: function(ship) {
        // // book way
        // for (var i = 0; i < this.shipLength; i++) {
        //     if (ship.hits[i] !== "hit") {
        //         return false;
        //     }
        // }
        // return true;
        //// my way
        if(ship.hits.includes("")) {
            return false;
        } else {
            return true; 
        }
    }
}

// //testing code fire and isSunk
// //missed guesses
// model.fire("53");

// // hit guesses
// model.fire("06");
// model.fire("16");
// model.fire("26");

// model.fire("24");
// model.fire("34");
// model.fire("44");

// model.fire("12");
// model.fire("11");
// model.fire("10");

var controller = {
    guesses: 0,

    processGuess: function(guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
            }
        }
    }
}

function parseGuess(guess) {
    // check input valid (not valid -> return null)
    if (guess === null || guess.length !== 2) {
        alert("Please enter a letter and a number");
        return null;
    }

    // convert letter to a number
    var firstLetter = guess.charAt(0);

    var firstNumber = firstLetter.toUpperCase().charCodeAt(0) - 65;


    // check number valid (not valid -> return null)
    if (firstNumber < 0 || firstNumber >= model.boardSize) {
        alert("That letter is not on the board");
        return null;
    }

    // check second number valid (not valid -> return null)
    var secondNumber = parseInt(guess.charAt(1), 10);
    if (secondNumber < 0 || secondNumber >= model.boardSize) {
        alert("That number is not on the board");
        return null;
    }

    // concatenate two numbers into string, return string
    return firstNumber.toString() + secondNumber.toString();
}

// // test parseGuess
//console.log(parseGuess("e6"));

// // test controller
// controller.processGuess("A0"); // miss

// controller.processGuess("A6"); // hit
// controller.processGuess("B6"); // hit
// controller.processGuess("C6"); // hit

// controller.processGuess("C4"); // hit
// controller.processGuess("D4"); // hit
// controller.processGuess("E4"); // hit

// controller.processGuess("B0"); // hit
// controller.processGuess("B1"); // hit
// controller.processGuess("B2"); // hit

function init() {
    model.placeShips();
    console.log(model.ships);
    // when button clicked
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    // when pressed return/enter 
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getShipLocNum(boardSize, shipLength) {
    return getRandomInt(0, boardSize - shipLength).toString();
}

function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);

    // empty guessInput after guess
    guessInput.value = "";
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

window.onload = init;