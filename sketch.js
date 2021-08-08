//Create variables here
var dog, dog1, happyDog, database, foodS, foodStock;
var addFood,feed;
var lastFed,fedTime;
var foodObj;

function preload()
{
	//load images here
  dog1 = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}


function setup() {

  database = firebase.database();
 
	createCanvas(500, 500);

  foodObj = new Food();

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
 
  dog = createSprite(width/2,300,50,50);
  dog.addImage(dog1);
  dog.scale = 0.2;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}
function draw() {  
background(46,139,87);

//if(keyWentDown(UP_ARROW)){
 // writeStock(foodS);
 // dog.addImage(happyDog);
//}

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed = data.val();
});

  foodObj.display();

  drawSprites();
  //add styles here
  
  fill(255,255,254);
  textSize(15);
   if(lastFed>=12){
      text("Last Feed :"+lastFed%12 + "PM",350,30);
   }else if(lastFed==0){
      text("Last Feed : 12 AM",350,30);
   }else{
    text("Last Feed :"+lastFed + "AM",350,30);
   }

 // text("foodStock:"+ foodS,20,450);
 
  
}

function feedDog(){
  dog.addImage(happyDog);
if(foodObj.getFoodStock()<=0){
foodObj.updateFoodStock(foodObj.getFoodStock()*0);
}
  else{
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
 }

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    food:x
  })
}

