// =========================
// GOAT RUNNER GAME ENGINE
// =========================

const goat = document.getElementById("goat");
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");

const startScreen = document.getElementById("startScreen");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

let score = 0;
let highScore = Number(localStorage.getItem("highScore")) || 0;

highScoreText.textContent = highScore;

let gameRunning = false;

let gravity = 0.8;
let velocity = 0;
let goatY = 0;

let jumping = false;

//============================
// START GAME
//============================

startBtn.onclick = () => {

    startScreen.classList.add("hidden");

    gameRunning = true;

    score = 0;

    gameLoop();

};

//============================
// RESTART GAME
//============================

restartBtn.onclick = () => {

    location.reload();

};

//============================
// JUMP
//============================

function jump(){

    if(!jumping){

        jumping = true;

        velocity = -16;

        let jumpSound=document.getElementById("jumpSound");

        if(jumpSound) jumpSound.play();

    }

}

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space" || e.code==="ArrowUp"){

        jump();

    }

});

//============================
// UPDATE GOAT
//============================

function updateGoat(){

    velocity += gravity;

    goatY += velocity;

    if(goatY > 0){

        goatY = 0;

        velocity = 0;

        jumping = false;

    }

    goat.style.transform=`translateY(${goatY}px)`;

}

//============================
// UPDATE SCORE
//============================

function updateScore(){

    score++;

    scoreText.textContent=score;

}

//============================
// GAME OVER
//============================

function endGame(){

    gameRunning=false;

    if(score>highScore){

        highScore=score;

        localStorage.setItem("highScore",highScore);

    }

    finalScore.textContent=score;

    gameOverScreen.classList.remove("hidden");

}

//============================
// MAIN GAME LOOP
//============================

function gameLoop(){

    if(!gameRunning) return;

    updateGoat();

    updateScore();

    requestAnimationFrame(gameLoop);

}

//============================
// DEMO ONLY
// Automatically end game
// after 30 seconds
//============================

setTimeout(()=>{

    if(gameRunning){

        endGame();

    }

},30000);
