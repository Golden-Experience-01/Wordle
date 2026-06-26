let height = 6; //number of guesses
let width = 5;  //length
let row = 0, col = 0; //row and col
let gameOver = false;
let wordList = [];
let word = "";
async function loadWords() {
  const response = await fetch("word.txt");
  const text = await response.text();

  wordList = text
    .split(/\r?\n/)
    .map(word => word.trim().toUpperCase())
    .filter(word => word.length === 5);

  word = wordList[Math.floor(Math.random() * wordList.length)];

  console.log("Today's word:", word);
}

window.onload = async function() {
  await loadWords();
  intialize();
}

function intialize() {

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = ""
      document.getElementById("board").appendChild(tile)
    }
  }
  document.addEventListener("keyup", (e) => {
    if (gameOver) return;

    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      if (col < width) {
        let currTile = document.getElementById(row.toString() + '-' + col.toString())
        if (currTile.innerText == "") {
          currTile.innerText = e.code[3]
          col += 1;
        }
      }
    }
    else if (e.code == "Backspace") {
      if (0 < col && col <= width) {
        col -= 1;
      }
      let currTile = document.getElementById(row.toString() + '-' + col.toString());
      currTile.innerText = "";
    }

    else if (e.code == "Enter" || e.code == "NumpadEnter") {
      update();
      row += 1;
      col = 0;
    }

    if (!gameOver && row == height) {
      gameOver = true;
      document.getElementById("answer").innerText = word;
    }
  })
}

function update() {
  let correct = 0;
  for (let c = 0; c < width; c++) {
    let currTile = document.getElementById(row.toString() + '-' + c.toString());
    let letter = currTile.innerText;

    if (word[c] == letter) {
      currTile.classList.add("correct");
      correct += 1;
    }
    else if (word.includes(letter)) {
      currTile.classList.add("present")
    }
    else {
      currTile.classList.add("absent")
    }

    if (correct == width) {
      gameOver = true;
    }
  }
}
