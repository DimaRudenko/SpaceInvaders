var aliens = [],
    ship,
    scene,
    gameSpeed = 2000,
    currentWay = 'left',
    timer;


initGame();


// главная петля игры
scene.gameLoop(function (scene) {
    stats.begin();

    var context = scene.context;
    context.beginPath();
    context.rect(0, 0, this.width, this.height);
    context.closePath();
    context.fill();

    updateAliensGroup();
    ship.update();

    stats.end();
});


function initGame() {
    scene = SI.scene("screen");
    ship = SI.ship().addTo(scene);
    initAliens();
    timer = setInterval(function () {
        console.log("aaa");
    }, gameSpeed);

}


/**
 * Инициализация "чужых" кораблей
 */
function initAliens() {

    var startPositionX = scene.getWidth() / 2;
    var startPositionY = 40;

    // корабли третьего типа
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

/**
 * Функция для смены направления всех "чужих" пачкой при касании бортика
 * попутно смещает вниз все корабли
 *
 */
function setWayAliensGroup(way) {
    for (var i = 0, leng = aliens.length; i < leng; i++) {
        aliens[i].setWay(way);
        aliens[i].moveDown(20);
    }
}


function updateAliensGroup() {
    for (var i = 0, leng = aliens.length; i < leng; i++) {
        var alienWay = aliens[i].checkWay();
        if (currentWay !== alienWay) {
            currentWay = alienWay;
            setWayAliensGroup(currentWay);
        }

        // колизия "чужой" <--> "игрок"
        if (SI.detectColision(aliens[i], ship)) {
            scene.pauseGame();
        }

        // колизия "чужой" <--> "пуля"
        if (SI.detectColision(aliens[i], ship.bullet)) {
            scene.pauseGame();
        }
        aliens[i].update();
    }
}

