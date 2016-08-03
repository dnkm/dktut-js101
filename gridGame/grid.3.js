// add spawnWall()

class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.grid = this.createGrid();
    }
    createGrid() {
        var grid = new Array(this.width*this.height);
        for(var i=0; i<grid.length; i++) {
            grid[i] = "";
        }
        return grid;
    }
    isWall(index) {
        return index / this.width < 1 ||
            index / this.width >= this.height-1 ||
            index % this.width == 0 ||
            index % this.width == this.width-1;
    }
    spawnWalls(percentage) {
        for(var i=0; i<this.grid.length; i++) {
            // inner wall
            if (this.isWall(i)) {
                this.grid[i] = 'W';
            }

            // outer wall
            else if (Math.random() < percentage) {
                this.grid[i] = "W";
            }
        }
    }
    printGrid() {
        var table = document.querySelector("#grid");

        for(var j=0; j<this.height; j++) {
            var tr = document.createElement('tr');

            for(var i=0; i<this.width; i++) {
                var td = this.printCell(td, j*this.height + i);
                tr.appendChild(td);
            }

            table.appendChild(tr);
        }
    }
    printCell(td, index) {
        var td = document.createElement('td');
        var value = this.grid[index];

        if (value == "W") {
            td.style.backgroundColor = 'black';
        } else {
            td.innerHTML = "&nbsp;";
        }

        return td;
    }
}