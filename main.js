"use strict";

let STATES = {O: "O", X:"X", E:"E"};
let GRID = [];
let WINNINGS = [
    ["00","01","02"],
    ["10","11","12"],
    ["20","21","22"],

    ["00","10","20"],
    ["01","11","21"],
    ["02","12","22"],

    ["00","11","22"],
    ["02","11","20"]
];

//Cell object
function Cell(x,y,state){
    this.x = x ;
    this.y = y;
    this.state = state;
}

Cell.prototype.getState = function(){
    return this.state;
};

Cell.prototype.setState = function(newState){
    this.state = newState;
};

Cell.prototype.getLocation = function(){
    return this.x + "" + this.y;
};

Cell.prototype.toString = function(){
    return '(' + this.x + ', ' + this.y + '):[' + this.state + ']';
};

//Grid object
//===========================================================
function Grid(w, h){
    this.w = w;
    this.h = h;
}

Grid.prototype.build = function(){
    for(let i = 0; i < this.w; i++){
        for(let j = 0; j < this.h; j++){
            GRID.push(new Cell(i,j, STATES.E))
        }
    }
};

Grid.prototype.getWidth = function(){
    return this.w;
};

Grid.prototype.getHeight = function(){
    return this.h;
}

Grid.prototype.getCell = function(x, y){    
    var selected;
     
    GRID.forEach(function(cell){
        if(cell.x === x && cell.y === y){
            selected = cell;
        }
    });

    return selected;
};

Grid.prototype.reset = function(){
    GRID.forEach(function(cell){
        cell.state = STATES.E;
    });
};

Grid.prototype.updateCell = function(x,y, newState){
    GRID.forEach(function(cell){
        if(cell.x === x && cell.y === y){
            cell.state = newState;
        }
    });
};

Grid.prototype.toString = function(){    
    return GRID.join(',');    
}

//===========================================================
// Behavior manipulation

let players = document.getElementsByName('player');
let startButton = document.getElementById('start');
let resetButton = document.getElementById('reset');

let gameGrid = new Grid(3,3);

//start startButton is clicked
startButton.addEventListener('click', function(){
    gameGrid.build();  
    var cell = gameGrid.getCell(0,0);        
});

resetButton.addEventListener('click', function(){
    gameGrid.reset();
    let cells = document.querySelectorAll('#gameboard td');
    resetGridStyle(cells);
});

function getSelectedPlayer(){
    for(let i = 0; i < players.length; i++){
        if(players[i].checked){
            return players[i].id;            
        }
    }
}

function getXY(elt){
    var coord = elt.id.split('');
    return {
        x: +coord[0],
        y: +coord[1]
    };
}

//get all the cell of the grid
let cells = document.querySelectorAll('#gameboard td');

function resetGridStyle(gridCells){
    gridCells.forEach(function(cell){
        cell.className = '';
    });
}

function checkWinningPattern(gridCells){
    
}

cells.forEach( function(cell){    
    cell.addEventListener('click', function(){        
        
        var player = getSelectedPlayer();

        if(player == undefined){
            alert('Please Select a player');
            return;//don't continue
        }

        var coord = getXY(this);
        var cellClicked = gameGrid.getCell(coord.x, coord.y);

        if(cellClicked == undefined){
            alert('Please click Start');
            return;//don't continue
        }

        //you can only change the state if it's empty
        if(cellClicked.state == "E"){

            if(player == "pl1"){            
                gameGrid.updateCell(coord.x, coord.y, STATES.X);
                this.className = 'fillx';
            }
            else{
                gameGrid.updateCell(coord.x, coord.y, STATES.O);
                this.className = 'fillo';
            }
            //only show when the state has been updated
            console.log(cellClicked);
        }                        
    });
})




