var aliens = [],
    ship,
    scene;


initGame();

scene.gameLoop(function (scene) {
    stats.begin();
    var context = scene.context;

    context.beginPath();
    context.rect(0, 0, this.width, this.height);
    context.closePath();
    context.fill();
    SI.detectColision(alien, ship);

    for (var i = 0, leng = aliens.length; i < leng; i++) {
        aliens[i].update();
    }
    // alien.update();
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

    alien = SI.sprite("images/alien_2.png", 40, 40).addTo(scene)
        .setPosition(scene.getWidth() / 2 - 60, scene.getHeight() / 2);

    ship = SI.ship().addTo(scene);

    initAliens();

}