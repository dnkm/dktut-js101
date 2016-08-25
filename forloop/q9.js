var ar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];  // 10 elements

for (var i = 0; i < 5; i++) {
    run();
}

function run() {

    // advance
    for (var i = ar.length - 1; i > 0; i--) {
        if (ar[i-1] > 0) {
            ar[i] += ar[i-1];
            ar[i-1] = 0;
        }
    }

    // deploy new
    ar[0] = parseInt(Math.random() * 5) + 1;
    //ar[ar.length-1] = ( parseInt(Math.random() * 5) + 1 ) * -1;

    console.log(ar);
}