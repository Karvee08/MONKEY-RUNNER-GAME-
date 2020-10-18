var gameSound,gameOversound,jumpSound;
var monkey , monkey_running, monkeyCollide;
var ground, invisiGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png")
monkeyCollide = loadAnimation("Monkey_01.png");
  
  gameSound = loadSound("game.mp3");
  groundImg = loadAnimation("download.png") 
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  backgroundImage = loadImage("jungle.jpg");
 
}

function setup(){
 createCanvas(windowWidth,windowHeight);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 
  monkey = createSprite(100,height-70,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
    
  ground = createSprite(width/2,height-1,600,30);
  ground.shapeColor ="green";
  ground.scale = 0.1;
  ground.addAnimation("GROUND",groundImg);
  
  
  invisiGround = createSprite(300,278,600,7);
  invisiGround.visible = false;
  
}

function draw(){
  background(backgroundImage);
  fill("white");
  text("SURVIVAL TIME: "+score, 470, 20);
  text("BANANAS COLLECTED: "+bananaScore,300,20);
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    gameSound.play();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*1.5/100);

    if((touches.length > 0 || keyDown("SPACE")) && monkey.y  >=height-80 ){
      monkey.velocityY = -13;
    }
  
    monkey.velocityY = monkey.velocityY + 0.4
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
      
    if (monkey.isTouching(bananaGroup)){
    
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
      
    }
       
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    monkey.visible=true;
    monkey.y = 565;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("red")
    stroke("black")
    textSize(30);
    text("GAMEOVER!!!", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to play again", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  
  
  drawSprites(); 
  
  monkey.collide(ground);
}

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(800,height-300, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.07;
    //banana.x=Math.round(random(120,200));
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);


    
  }
  

  
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,height-20,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }}
  function increase()
 {
 if ( bananaGroup.isTouching(monkey));
   switch(score)
  { case 10 : monkey.scale=0.12;
    break;
    case 20:monkey.scale=0.14;
    break;
    case 30 :monkey.scale=0.16;
    break;
    case 40: monkey.scale=0.18 ;
    break;
    default:break;
  }
  
  
}  







