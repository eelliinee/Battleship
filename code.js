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

    ships:  [{locations: ["06", "16", "26"], hits: ["", "", ""]},
            {locations: ["24", "34", "44"], hits: ["", "", ""]},
            {locations: ["10", "11", "12"], hits: ["", "", ""]}],
    fire: function(guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            // determine if guess is in locations
            var index = ship.locations.indexOf(guess);
            // index is -1 if guess isn't in the array, so when we have a hit:
            if (index >= 0) {
                ship.hits[index]= "hit";
                // sink ship when all locations are hit
                if (this.isSunk(ship)) {
                    this.shipsSunk++;
                }
                return true; 
            }
        return false;
        }
    },
    isSunk: function(ship) {
        //// book way
        // for (var i = 0; i < this.shipLength; i++) {
        //     if (ship.hits[i] !== "hit") {
        //         return false;
        //     }
        // }
        // return true;
        //// my way
        ship.hits.includes("") ? false : true; 
    }
}

