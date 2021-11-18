var zombie1, zombie2, zombie1Img, zombie2Img;
var bgImg;
var soldier, soldier_rightImg, soldier_leftImg;
var bullet, left_bulletImg, right_bulletImg;
var bulletGroup;

var direction;
var score = 0;
var flag = false;

function preload(){
zombie1Img = loadAnimation("images/zombie1walking1.png", "images/zombie1walking2.png", "images/zombie1walking3.png" );
zombie2Img = loadImage("images/zombie2.png");
bgImg = loadImage("images/bg.jpg");
soldier_rightImg = loadImage("images/soldier_right.png");
soldier_leftImg = loadImage("images/soldier_left.png");
left_bulletImg = loadImage ("images/left_bullet.png");
right_bulletImg = loadImage ("images/right_bullet.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  soldier = createSprite(windowWidth/2, height-160, 50, 50);
  soldier.addImage(soldier_rightImg);
  soldier.scale = 0.46

  zombie2 = createSprite(width-60, height-180, 50, 50);
  zombie2.addImage(zombie2Img);
  zombie2.scale = 0.48;
  zombie2.velocityX = -5;

  bulletGroup = createGroup()

}

function draw() {
  background(bgImg);
  flag = false;  

  console.log(frameCount % 20);
  
  textSize(40);
  text("My Score = " + score,100,100 )
    
  if(keyDown("right")){
    soldier.addImage(soldier_rightImg);  
    direction = "right";
  }
  
  if(keyDown("left")){
      soldier.addImage(soldier_leftImg);
      direction = "left";
  }

   if (isTouching( bullet, zombie1Img)){
     flag = true;
   }  

   if(flag === true){
    score = score + 1;
   
  }

  spawnZombie1()
  spawnBullets(); 
  dummy ()
  drawSprites();
}  

function spawnBullets() {
  if (frameCount % 15 === 0) {
    bullet = createSprite(windowWidth/2+100, height-265,10,10);
    bulletGroup.add(bullet);

    if(keyDown("space") && direction === "right"){
      bullet.addImage(right_bulletImg);
      bullet.scale = 0.20;
      bullet.velocityX = 20;
     }
    
     if(keyDown("space") && direction === "left"){
      bullet.x = windowWidth/2-100;
      bullet.addImage(left_bulletImg);
      bullet.scale = 0.20;
      bullet.velocityX = -20;
     }
}

}

function spawnZombie1(){
  if (frameCount % 200 === 0) {
  zombie1 = createSprite(10 , height-180, 50, 50);
  zombie1.addAnimation("zombie1", zombie1Img);
  zombie1.scale = 1.2;
  zombie1.velocityX = 5;
  }
}


function isTouching(object1,object2){
  if (object1.x - object2.x < object2.width/2 + object1.width/2
    && object2.x - object1.x < object2.width/2 + object1.width/2
    && object1.y - object2.y < object2.height/2 + object1.height/2
    && object2.y - object2.y < object2.height/2 + object1.height/2) {
    
    return true;
  }
  else {
    return false;
  } 
}