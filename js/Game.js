class Game {
  constructor() {}
  //BP
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  //BP
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  // TA
  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
    fuels = new Group()
    powerCoins= new Group() 

    this.addSprites(fuels,4,fuelImage,0.02)
    this.addSprites(powerCoins,18,powerCoinImage,0.09)

  }

addSprites(spriteGroup, numberofSprites, spriteImage, scale){
  for (var i = 0; i<numberofSprites;i++){
    var x,y;
    x=random( width/2+150 , width/2-150)
    y=random ( -height*4.5 , height-400)

    var sprite = createSprite(x,y)
sprite.addImage ("sprite1",spriteImage)
sprite.scale=scale
spriteGroup.add (sprite)

  }
}

  //BP
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  //SA
  play() {
    this.handleElements();

    Player.getPlayersInfo(); //added

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //index of the array
       index = 0;
      for (var plr in allPlayers) {
       
        //use data form the database to display the cars in x and y direction
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;

        cars[index].position.x = x;
        cars[index].position.y = y;
        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);
          camera.position.x = width/2
        camera.position.y = cars[index-1].position.y
        }
        //add 1 to the index for every loop
        index = index + 1;
        
      }
     
      

      // handling keyboard events
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10;
        player.update();
      }
 
      drawSprites();
    }
  }
}
