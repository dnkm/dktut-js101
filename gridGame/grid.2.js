// place outer border

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
            //td.innerHTML = index / this.width;
            td.innerHTML = index % this.width;
            
            if (index / this.width < 1) {
                td.style.borderTop = '5px solid red';
            }

            if (index / this.width >= this.height-1 ) {
                td.style.borderBottom = '5px solid red';
            }

            if (index % this.width == 0) {
                td.style.borderLeft = '5px solid blue';
            }

            if (index % this.width == this.width-1) {
                td.style.borderRight = '5px solid blue';
            }

        }

        return td;
    }
}