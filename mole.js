let currMoleTiles = [];
let prevMoleTiles = []; // Untuk menyimpan posisi mole sebelumnya
let currPlantTiles = [];
let score = 0;
let gameOver = false;
let moleSpeed = 500; // Kecepatan awal mole
let moleInterval; // Menyimpan interval mole

window.onload = function() {
    setGame();
}

function setGame() {
    // set up the grid in html
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    // Inisiasi mole dan plant
    moleInterval = setInterval(setMole, moleSpeed); 
    setInterval(setPlant, 2000); // Plant tetap muncul setiap 2 detik
}

function getRandomTile() {
    let num;
    do {
        num = Math.floor(Math.random() * 9); // Ambil angka acak
    } while (prevMoleTiles.includes(num.toString())); // Pastikan tidak sama dengan posisi sebelumnya
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }
    // Bersihkan mole sebelumnya
    currMoleTiles.forEach(tile => tile.innerHTML = "");
    prevMoleTiles = currMoleTiles.map(tile => tile.id); // Simpan posisi mole sebelumnya
    currMoleTiles = [];

    // Tentukan jumlah mole berdasarkan skor
    let moleCount = score >= 400 ? 3 : 2;

    // Tampilkan mole secara acak
    while (currMoleTiles.length < moleCount) {
        let num = getRandomTile();
        let moleTile = document.getElementById(num);

        // Pastikan mole tidak muncul di posisi plant dan tidak sama
        if (currPlantTiles.some(tile => tile.id == num) || currMoleTiles.includes(moleTile)) {
            continue;
        }

        let mole = document.createElement("img");
        mole.src = "./monty-mole.png";
        moleTile.appendChild(mole);
        currMoleTiles.push(moleTile);
    }
}

function setPlant() {
    if (gameOver) {
        return;
    }
    // Bersihkan plant sebelumnya
    currPlantTiles.forEach(tile => tile.innerHTML = "");
    currPlantTiles = [];

    // Tentukan jumlah plant berdasarkan skor
    let plantCount = score >= 250 ? 2 : 1;

    // Tampilkan plant secara acak
    while (currPlantTiles.length < plantCount) {
        let num = getRandomTile();
        let plantTile = document.getElementById(num);

        // Hindari plant muncul di posisi mole atau plant lain
        if (currMoleTiles.some(tile => tile.id == num) || currPlantTiles.includes(plantTile)) {
            continue;
        }

        let plant = document.createElement("img");
        plant.src = "./piranha-plant.png";
        plantTile.appendChild(plant);
        currPlantTiles.push(plantTile);
    }
}

function selectTile() {
    if (gameOver) {
        return;
    }
    // Jika tile yang diklik adalah salah satu dari tile mole
    if (currMoleTiles.includes(this)) {
        score += 10;
        document.getElementById("score").innerText = score.toString();

        // Tingkatkan kecepatan mole saat skor naik
        if (score === 100) {
            increaseMoleSpeed();
        }

        if (score === 200) {
            increaseMoleSpeed();
        }

        if (score === 300) {
            increaseMoleSpeed();
        }

        if (score === 400) {
            increaseMoleSpeed();
        }

        // Jika skor mencapai 500, tampilkan pesan menang
        if (score >= 500) {
            document.getElementById("score").innerText = "Congrats you win! Score: " + score.toString();
            gameOver = true;
            clearInterval(moleInterval); // Hentikan mole setelah menang
        }
    }
    // Jika tile yang diklik adalah plant
    else if (currPlantTiles.includes(this)) {
        document.getElementById("score").innerText = "GAME OVER! Score: " + score.toString();
        gameOver = true;
        clearInterval(moleInterval); // Hentikan mole setelah game over
    }
}

function increaseMoleSpeed() {
    clearInterval(moleInterval); // Hentikan interval sebelumnya
    moleSpeed -= 100; // Kurangi waktu untuk mempercepat mole
    moleInterval = setInterval(setMole, moleSpeed); // Atur ulang interval mole dengan kecepatan baru
}