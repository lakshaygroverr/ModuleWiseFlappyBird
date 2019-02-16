// select canvas
var gameCanvas = document.getElementById("canvas");
// context will give methods and properties to give access to the canvas /write or draw anything over it/
var gameContext = gameCanvas.getContext("2d");
//creating image object
var bird = new Image();
//assigning image file to the object
bird.src = "images/bird.png";
// x coordinate of bird
var birdX = 10;
// y coordinate of bird
var birdY = 150;
// function to draw bird on canvas
bird.onload = function draw () {
    //draws bird to the canvas at specified coordinates
    gameContext.drawImage(bird, birdX, birdY);
}




