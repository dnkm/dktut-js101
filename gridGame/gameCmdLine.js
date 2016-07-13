var game = {
    rows: 5,
    cols: 10,
    board: [],
}

game.init = function() {
    this.createBoard();
    this.spawnRandomly("H");
    for(var i=0; i<10; i++) {
        this.spawnRandomly("M");
    }
}

game.createBoard = function() {
    this.board = new Array(this.rows * this.cols);
    
    for(var i=0; i<this.rows*this.cols; i++) {
        this.board[i] = { H:0, M:0 };
    }
}

game.printBoard = function() {
    var i = 0;
    for(var y = this.rows-1; y >= 0; y--) {
        var row = '';
        for(var x = 0; x < this.cols; x++) {
            row += "[" + this.printCell(i++) + "]";
        }
        console.log(row);
    }
}

game.printCell = function(index) {
    var ret = '';
    
    for(var key in this.board[index]) {
       for(var i=0; i<this.board[index][key]; i++) {
           ret += key;
       } 
    }
    
    var paddings = 3 - ret.length;
    for(var i=0 ; i < paddings; i++) {
        ret += ' ';
    }
    
    return ret;
}


game.spawnRandomly = function(unit) {
    var location = parseInt(Math.random() * this.rows * this.cols);
    this.board[location][unit] ++;
}

game.init();
game.printBoard();