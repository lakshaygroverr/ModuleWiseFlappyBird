// select canvas
var gameCanvas = document.getElementById("canvas");
// context will give methods and properties to give access to the canvas /write or draw anything over it/
var gameContext = gameCanvas.getContext("2d");
// creating image object
var bird = new Image();
var backgroundImage = new Image();
var platformImage = new Image();

// assigning image file to the object
bird.src = "images/bird.png";
backgroundImage.src = "images/Background.png";
platformImage.src = "images/platform.png";

// x coordinate of bird
var birdX = 10;
// y coordinate of bird
var birdY = 150;

// add continuously to birdY for falling motion
var gravity = 1.5;

// creating object of audio
var fly_sound = new Audio();

//assigning audio file to the object
fly_sound.src = "sounds/fly.mp3";

// function to draw images on canvas
function draw() {

    //draw background image on canvas
    gameContext.drawImage(backgroundImage, 0, 0, gameCanvas.width, gameCanvas.height);
    //draw platform 
    gameContext.drawImage(platformImage, 0, gameCanvas.height - platformImage.height);
    //draw bird
    gameContext.drawImage(bird, birdX, birdY);
    //bird will keep falling down
    birdY += gravity;
    //function to detect collision with the canvas base
    detectCollision();
    // will keep on calling draw function /callback function/
    requestAnimationFrame(draw);


}

// call draw function
draw();

// function to detect collision with the platform
function detectCollision() {
    if (birdY + bird.height >= gameCanvas.height - platformImage.height) {
        birdY = gameCanvas.height - platformImage.height - bird.height;
    }
}

// when a key is pressed, moveup() is called and bird flies
document.addEventListener("keydown", flyBird);


function flyBird(e) {
    //check if 'spacebar' is pressed 
    if (e.keyCode == 32) {
        // used to set upper bound for flight
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
