// board
var blockSize = 25; // one block size = 25 pixels
var rows = 20;
var cols = 30;
var board;
var context;

// snake head
var snakeX = blockSize*5;
var snakeY = blockSize*5;

var startingSnakeX = snakeX;
var startingSnakeY = snakeY;

// speed 
var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

// food
var foodX;
var foodY;

var gameOver = false;
var score = 0;


var gameOver = false;
var alertShown = false;

window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // used for drawing on the board

    placefood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000/8); // 100 milliseconds
    
}

function changeDirection(e){

    if (e.code == "ArrowUp" && velocityY != 1)
    {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1)
    {
        velocityX = 0;
        velocityY = 1;

    }
    else if (e.code == "ArrowLeft" && velocityX != 1)
    {
        velocityX = -1;
        velocityY = 0;

    }
    else if (e.code == "ArrowRight" && velocityX != -1)
    {
        velocityX = 1;
        velocityY = 0;

    }

}


  
 
  function update() {
    if (gameOver) {
        resetGame();
        return;
      }
      ;
    // Check for game over condition (snake touches its body)
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
        gameOver = true;
        if (!alertShown) {
            alert("Game Over! Your score is " + score * 10);
            alertShown = true;
        }
        }
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
  
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);
    
  
    if (snakeX == foodX && snakeY == foodY) {
        animateEffect();
      snakeBody.push([foodX, foodY]);
      placefood();
      score++;
      mark = document.getElementById("h2");
      mark.textContent = "Score:  " + score*10;
    }

 
  
    // Store the previous position of the snake's head
    let prevSnakeX = snakeX;
    let prevSnakeY = snakeY;
  
    // Update the position of the snake's head
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
  
    // Smooth motion using interpolation
    let animationProgress = 0;
  
    function animateMovement() {
      if (animationProgress < 1) {
        // Interpolate the position between the previous and current position
        let interpolatedX = prevSnakeX + (snakeX - prevSnakeX) * animationProgress;
        let interpolatedY = prevSnakeY + (snakeY - prevSnakeY) * animationProgress;
  
        context.fillStyle = "white"; // color of the snake
        context.beginPath();
        context.arc(
          interpolatedX + blockSize / 2,
          interpolatedY + blockSize / 2,
          blockSize / 2,
          0,
          2 * Math.PI
        );
        context.fill();
        
  
        animationProgress += 0.1;
        requestAnimationFrame(animateMovement);
      } else {
        // Draw the final position of the snake's head
        context.fillStyle = "lime"; // color of the snake
        context.beginPath();
          // length of body
    for (let i = snakeBody.length-1; i >0; i--)
    {
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }
        context.arc(snakeBody[i][0] + blockSize/2, snakeBody[i][1] + blockSize/2, blockSize/2, 0, 2 * Math.PI);
        
        context.fill();
      }
  
      // Draw the snake's body segments
      for (let i = 0; i < snakeBody.length; i++) {
        let segmentX = snakeBody[i][0];
        let segmentY = snakeBody[i][1];
  
        context.beginPath();
        context.arc(
          segmentX + blockSize / 2,
          segmentY + blockSize / 2,
          blockSize / 2,
          0,
          2 * Math.PI
        );
        context.fill();
      }
    }
  
    animateMovement();

    // GAME OVER CONDITON
    if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize)
    {
        gameOver = true;
        
        if (!alertShown) {
            alert("Game Over! Your score is " + score * 10);
            alertShown = true;
        }
       
    }


  }




  function resetGame() {
    // Reset game state to initial values
    gameOver = false;
    alertShown = false;
    snakeX = startingSnakeX;
    snakeY = startingSnakeY;
    snakeBody = [];
    velocityX = 0;
    velocityY = 0;
    score = 0;
    mark = document.getElementById("h2");
    mark.textContent = "Score:  " + score*10;
    // Clear canvas
    context.clearRect(0, 0, board.width, board.height);
  
    // Restart the game loop
    animateMovement();
  }
  


  function animateEffect() {
    let effectProgress = 0;
    let effectRadius = 0;
    let maxEffectRadius = blockSize * 2;
  
    function animateFrame() {
      if (effectProgress < 1) {
        effectRadius = maxEffectRadius * effectProgress;
        context.strokeStyle = "white";
        context.lineWidth = 2;
        context.beginPath();
        context.arc(
          foodX + blockSize / 2,
          foodY + blockSize / 2,
          effectRadius,
          0,
          2 * Math.PI
        );
        context.stroke();
  
        effectProgress += 0.1;
        requestAnimationFrame(animateFrame);
      }
    }
  
    animateFrame();
  }



function placefood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize; 
}