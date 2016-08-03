var cv = document.querySelector("#cv");
var ctx = cv.getContext("2d");

// rect
ctx.fillStyle = "pink";
ctx.fillRect(0,0,100,100);

// line
ctx.strokeStyle="skyblue";
ctx.moveTo(110,110);
ctx.lineTo(200,200);
ctx.stroke();

// circle
ctx.strokeStyle="blue";
ctx.beginPath();
var radius = Math.sqrt(90*90 + 90*90);  // add this later
ctx.arc(200,200,radius,0,2*Math.PI);
ctx.stroke();
