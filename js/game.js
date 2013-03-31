var aliens = [],
    ship,
    scene,
    gameSpeed = 1,
    currentWay = 'left';


initGame();


// главная петля игры
scene.gameLoop(function (scene) {
    stats.begin();

    var context = scene.context;
    context.beginPath();
    context.rect(0, 0, this.width, this.height);
    context.closePath();
    context.fill();

    for (var i = 0, leng = aliens.length; i < leng; i++) {
        var alienWay = aliens[i].checkWay();
        if (currentWay !== alienWay) {
            currentWay = alienWay;
//            aliens[i].setWay(currentWay);
            console.log(alienWay);
          //  aliens[i].setWay(currentWay);

        }
        console.log(alienWay);
        //console.log(alienWay);
        aliens[i].step();
        aliens[i].update();
    }

    ship.update();


    stats.end();
});


function initAliens() {

    var startPositionX = scene.getWidth() / 2;
    var startPositionY = 70;

    // корабли третего типа
    for (var x = 0; x < 6; x++) {
        for (var y = 0; y < 1; y++) {
            var posX = startPositionX + (50 * x);
            var posY = startPositionY + (50 * y);

            var alien = SI.alien(3)
                .addTo(scene)
                .setPosition(posX, posY);
            aliens.push(alien);
        }
    }

    // корабли второго типа
    for (var x = 0; x < 6; x++) {
        for (var y = 0; y < 1; y++) {
            var posX = startPositionX + (50 * x);
            var posY = startPositionY + 40 + (50 * y);

            var alien = SI.alien(2)
                .addTo(scene)
                .setPosition(posX, posY);
            aliens.push(alien);
        }
    }

    // корабли второго типа
    for (var x = 0; x < 6; x++) {
        for (var y = 0; y < 1; y++) {
            var posX = startPositionX + (50 * x);
            var posY = startPositionY + 80 + (50 * y);

            var alien = SI.alien(1)
                .addTo(scene)
                .setPosition(posX, posY);
            aliens.push(alien);
        }
    }

}

function initGame() {

    scene = SI.scene("screen");

    ship = SI.ship().addTo(scene);

    initAliens();

}