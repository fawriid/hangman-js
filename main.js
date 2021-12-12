let secretWords = ["bullet", "hang", "execution", "words", "secret", "gun", "sport"]
let randomWord = ""
let lets = []
let clicked = []
let result = ""
let mistakes = 0
function start() {
    randomWord = secretWords[Math.floor(Math.random() * secretWords.length)]
    lets = document.getElementById("letters").querySelectorAll("div")
    lets.forEach(lets => lets.addEventListener("click", buttonHalndler))
    window.addEventListener("keydown", keyHandler)
}
function setUnderScore() {
    let splited = randomWord.split("")
    let chekedWord = splited.map(letter => clicked.includes(letter) ? letter : "_")
    result = chekedWord.join("")
    document.getElementById("answer").querySelector("p").innerHTML = `<p>${result}</p>`  
}
function ifWon (){
    if (result === randomWord) {
        document.querySelector("#image").querySelector("img").src = "/assets/winner.png"
        document.querySelector("#win").style.display = "block"
        document.getElementById("letters").style.display = "none"
        window.removeEventListener("keydown", keyHandler);
    }
}
function ifLose() {
    if (mistakes === 6) {
        document.getElementById("answer").querySelector("p").innerHTML = `gameover`;
        document.getElementById("answer").querySelector("p").style.color = "red";
        document.getElementById("letters").style.display =
            "none";
        window.removeEventListener("keydown", keyHandler);
    }
}

function letterHandler(letter) {
    letter = letter.toLowerCase();
    clicked.includes(letter) ? null : clicked.push(letter)
    document.getElementById(letter.toUpperCase()).className = "used"
    if (randomWord.includes(letter)) {
        setUnderScore()
        ifWon()
    } else if (!(randomWord.includes(letter))) {
        mistakes++;
        document.querySelector("#image").querySelector("img").src =`/assets/hangman${mistakes}.png`;
        ifLose()
    }
}

function buttonHalndler(event) {
    letterHandler(event.target.id)
}

function keyHandler(event) {
    letterHandler(event.key)
}





start()
setUnderScore()