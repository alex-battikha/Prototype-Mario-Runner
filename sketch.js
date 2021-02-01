var player, marioImage;
var firePlant, fireImage, fireGroup;
var piranhaPlant, piranhaPlantImage, piranhaGroup;
var coin, coinImage, coinGroup;
var backgroundSprite, backgroundImage;
var heart1, heart2, heart3, heartImage, hearts;
var score;
var play, end, gameState;

var count;

var marioFont;

var gameOverImage, resetImage;

function preload() {
  marioImage = loadImage("images/mario.png");

  fireImage = loadImage("images/fire-plant.png");

  piranhaPlantImage = loadImage("images/piranha-plant.png");

  coinImage = loadImage("images/mario-coin.png");

  heartImage = loadImage("images/heart.png");

  backgroundImage = loadImage("images/mario-background-long.png");

  gameOverImage = loadImage("images/game-over.png");
  resetImage = loadImage("images/reset-button.png");

  marioFont = loadFont("fonts/SuperMario256.ttf");
}

function setup() {
  createCanvas(800, 500);

  backgroundSprite = createSprite(width/2, height/2, width, height);
  backgroundSprite.scale = 1.6;
  backgroundSprite.addImage(backgroundImage);

  player = createSprite(105, 300, 20, 20);
  player.scale = 0.3;
  player.addImage(marioImage);

  heart1 = createSprite(50, 50);
  heart1.scale = 0.05;
  heart1.addImage(heartImage);

  heart2 = createSprite(100, 50);
  heart2.scale = 0.05;
  heart2.addImage(heartImage);
  
  heart3 = createSprite(150, 50);
  heart3.scale = 0.05;
  heart3.addImage(heartImage);

  hearts = 3;

  coinGroup = createGroup();

  fireGroup = createGroup();

  piranhaGroup = createGroup();

  score = 0;

  count = 0;

  play = 0;
  end = 1;

  gameState = 0;
}

function draw() {
  background(255);

  if(gameState == 0) {
    //if-else conditions to move mario up and down
    if(keyDown(DOWN_ARROW) && player.y <= height-110) {
      player.y+=10;
    }
    else if(keyDown(UP_ARROW) && player.y >= 140) {
      player.y-=10;
    }

    //PROBLEM!
    // if(player.y >= 140 && player.y <= height-110){
    //   console.log(player.y);
    //   if(keyDown(DOWN_ARROW)) {
    //     player.y+=10;
    //   }
    //   else if(keyDown(UP_ARROW)) {
    //     player.y-=10;
    //   }
    // }
    
    console.log(camera.position.x+=4);
    player.x+=4;
    heart1.x+=4;
    heart2.x+=4;
    heart3.x+=4;

    if(camera.position.x < width/2) {
      camera.position.x = backgroundSPrite.width/2;
    }

    //Spawn coins and plants
    spawnCoins();
    //spawnPowers();
    spawnPiranhasLow();
    spawnPiranhasHigh();

    //Check collision between mario and enemy and deduct heart
    if(player.isTouching(coinGroup)) {
      coinGroup.destroyEach();
      score+=1;
    }
    //Increase score with detection of coin

    drawSprites();
  }
  else if(gameState == 1) {
    reset();
  }

  //display score - text
  count+=4;
  textSize(28);
  fill(0);
  textFont(marioFont);
  text("Score" + " : " + score, 600+count, 65);
}

function spawnPowers() {
  if(frameCount%300 == 0) {
    var randomPlantY = random(100, 520);
    firePlant = createSprite(500, randomPlantY);
    firePlant.scale = 0.045;
    firePlant.addImage(fireImage);
    //TODO: add game camera for firePlant

    firePlant.lifetime = 120;

    fireGroup.add(firePlant)
  }
}

function spawnCoins() {
  if(frameCount % 190 == 0) {
    //var randomCoinY = random(100, 520);
    coin = createSprite(camera.position.x + 400, random(140, 390));
    coin.scale = 0.15;
    coin.addImage(coinImage);

    coin.lifetime = 400;

    coinGroup.add(coin);
  }
}

function spawnPiranhasLow() {
  if(frameCount % 150 == 0) {
    console.log("Piranha Plant");
    piranhaPlant = createSprite(camera.position.x + 450, camera.position.y + 450);
    piranhaPlant.scale = 0.15;
    piranhaPlant.addImage(piranhaPlantImage);

    //come back and adjust
    piranhaPlant.lifetime = 250;

    piranhaGroup.add(piranhaPlant);
  }
}

function spawnPiranhasHigh() {
  if(frameCount % 190 == 0) {
    piranhaPlant = createSprite(450, 400);
    piranhaPlant.scale = 0.15;
    piranhaPlant.addImage(piranhaPlantImage);

    //come back and adjust
    piranhaPlant.lifetime = 250;

    piranhaGroup.add(piranhaPlant);
  }
}

function reset() {
  //reset everything in game  
}


//Extras:
//Fire shots
//Switch out Mario code