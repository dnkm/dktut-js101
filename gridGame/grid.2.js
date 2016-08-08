class Grid {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = new Array(width*height);
    this.initGrid();
    this.spawnWalls(0.5);
  }
  initGrid() {
    for(var i=0; i<this.grid.length; i++) {
      this.grid[i] = "";
    }
  }
  printGrid() {
    var table = document.querySelector("#grid");

    for(var y = 0; y < this.height ; y++) {
      var tr = document.createElement("tr");

      for(var x = 0; x < this.width ; x++) {
        var td = this.createTD(x,y);
        tr.appendChild(td);
      }

      table.appendChild(tr);
    }
  }
  createTD(x,y) {
    var data = this.grid [ y * this.width + x ];

    var td = document.createElement("td");
    if (data == "W") {
      td.style.backgroundColor = "black";
    }
    return td;
  }
  spawnWalls(percentage) {
    for(var i=0; i<this.grid.length; i++) {
      if (Math.random() < percentage) {
        this.grid[i] = "W";
      }
    }
  }

}
