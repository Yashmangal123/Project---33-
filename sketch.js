const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;

var particle
var particles = [particle];
var plinkos = [];
var divisions = [];
var divisionHeight = 250;
var score = 0;
var count = 0;
var gameState = "start"
var line;

function setup() {
    createCanvas(480,700);
    engine = Engine.create();
    world = engine.world;

    ground = new Ground(240,680,700,20);

    ground1 = new baseground(0,350,20,700);
    ground2 = new baseground(240,695,900,20);
    ground3 = new baseground(479,350,20,700);
    ground4 = new baseground(240,5,900,20);

    for(var k = 14;k <= 470 ;k = k+90){
      divisions.push(new Division(k,560,10,divisionHeight));
    }

    for(var j = 40;j <= width ;j = j+50){
      plinkos.push(new Plinko(j,75));
    }

    for(var j = 65;j <= width - 25 ;j = j+50){
      plinkos.push(new Plinko(j,175));
    }

    for(var j = 40;j <= width ;j = j+50){
      plinkos.push(new Plinko(j,275));
    }

    for(var j = 65;j <= width - 25 ;j = j+50){
      plinkos.push(new Plinko(j,375));
    }

    line = createSprite(240,420,460,7);
    line.shapeColor = "Yellow"

}

function draw() {
  
  background(0);
  Engine.update(engine);
  textSize(20)
  text("Score : " + score,30,45);
  text("100",45,470)
  text("100",135,470)
  text("300",225,470)
  text("400",315,470)
  text("200",405,470)
 
  
  ground.display();

  ground1.display();
  ground2.display();
  ground3.display();
  ground4.display();

  if ( gameState == "end") {
    fill("red");
    textSize(100);
    text("Game Over", 200, 400);
   
  } 

  for(var k = 0;k < divisions.length;k++){
    divisions[k].display();
  }

  for(var j = 0;j < plinkos.length;j++){
    plinkos[j].display();
  }

  if(particle!=null)
    {
       particle.display();
        
        if (particle.body.position.y>660)
        {
              if (particle.body.position.x < 180) 
              {
                  score=score+100;      
                  particle=null;
                  if ( count>= 5) gameState ="end";                          
              }


              else if (particle.body.position.x < 280 && particle.body.position.x > 180 ) 
              {
                    score = score + 300;
                    particle=null;
                    if ( count>= 5) gameState ="end";

              }
              else if (particle.body.position.x < 380 && particle.body.position.x > 280 )
              {
                    score = score + 400;
                    particle=null;
                    if ( count>= 5)  gameState ="end";

              }   
              
              else if (particle.body.position.x < 480 && particle.body.position.x > 380 )
              {
                    score = score + 200;
                    particle=null;
                    if ( count>= 5)  gameState ="end";

              }   
              
        }
    }

    drawSprites();
  
}

function mousePressed() {
  if(gameState !== "end") {
      count++;
  particle = new Particle(mouseX, 50, 10, 10);
  }
}
