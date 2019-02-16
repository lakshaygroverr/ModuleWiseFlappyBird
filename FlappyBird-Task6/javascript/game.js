// select canvas
var gameCanvas = document.getElementById("canvas");
// context will give methods and properties to give access to the canvas /write or draw anything over it/
var gameContext = gameCanvas.getContext("2d");
// creating image object
var bird = new Image();
var backgroundImage = new Image();
var platformImage = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();


// assigning image file to the object
bird.src = "images/bird.png";
backgroundImage.src = "images/Background.png";
platformImage.src = "images/platform.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// x coordinate of bird
var birdX = 10;
// y coordinate of bird
var birdY = 150;

// add continuously to birdY for falling motion
var gravity = 1.5;

// gap between pipeNorth and pipeSouth
var gapBetweenPipes = 85;
var constant;

// creating object of audio
var fly_sound = new Audio();
var defeat_sound = new Audio();
var victory_sound = new Audio();

// assigning audio file to the object
fly_sound.src = "sounds/fly.mp3";
defeat_sound.src = "sounds/crash.mp3";
victory_sound.src = "sounds/victory.mp3";

// pipe's initial coordinates
pipe = {
    x: gameCanvas.width,
    y: 0
};


function draw() {

    // draw background image on canvas
    gameContext.drawImage(backgroundImage, 0, 0, gameCanvas.width, gameCanvas.height);
    // draw north pipe
    gameContext.drawImage(pipeNorth, pipe.x, pipe.y);
    // draw south pipe
    constant = pipeNorth.height + gapBetweenPipes;
    gameContext.drawImage(pipeSouth, pipe.x, constant);
    // move pipe from right to left
    pipe.x--;

    if (pipe.x == 0) {
        pipe.x = gameCanvas.width;
    }
    //draw platform 
    gameContext.drawImage(platformImage, 0, gameCanvas.height - platformImage.height);
    //draw bird
    gameContext.drawImage(bird, birdX, birdY);
    //bird will keep falling down
    birdY += gravity;
    //function to detect collision with the canvas base
    detectCollision();
    // will keep on calling draw function /callback function/

    if (pipe.x == 10) {

        victory_sound.play();
    }



    requestAnimationFrame(draw);


}

// call draw function
draw();

// function to detect collision with the platform
function detectCollision() {
    if (birdX + bird.width >= pipe.x && birdX <= pipe.x + pipeNorth.width && (birdY <= pipe.y + pipeNorth.height || birdY + bird.height >= pipe.y + constant) || birdY + bird.height >= gameCanvas.height - platformImage.height) {

        defeat_sound.play();
        alert("You Lose");
        location.reload();
        window.reload();
    }

}

// when a key is pressed, moveup() is called and bird flies
document.addEventListener("keydown", flyBird);


function flyBird(e) {
    //check if 'spacebar' is pressed 
    if (e.keyCode == 32) {
        var flag = 0;
        var flyInterval = setInterval(function () {
            // flag is inceremented every 20 milliseconds
            flag += 1
            // bird moves up
            birdY -= 5;
            // as flag gets greater than 10, bird starts to fall down
            if (flag > 10) {
                clearInterval(flyInterval);
            }
            // play flying sound
            fly_sound.play();
        }, 20);
    }
}
