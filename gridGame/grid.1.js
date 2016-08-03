// 1. create a class
// 2. create an array that represents the grid

class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;

        this.initGrid();
    }
    initGrid() {
        this.grid = new Array(this.width * this.height);
        for(var i=0; i<this.grid.length; i++) {
            this.grid[i] = "";
        }
    }
    printGrid() {
        var table = document.querySelector("#grid");

        for(var y=0; y<this.height; y++) {
            var tr = document.createElement("tr");
            tr.innerHTML = "<td>1</td>";
            table.appendChild(tr);
        }
    }
}