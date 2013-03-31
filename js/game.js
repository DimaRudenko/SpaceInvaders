var aliens = [],
    ship,
    scene,
    currentWay = 'left',
    level = 1,
    score=0;

initGame();

function initGame() {
    scene = SI.scene("screen");
    ship = SI.ship().addTo(scene);
    initAliens();
    scene.gameLoop(gameStart);
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
            var posX = startPositionX + (60 * x);
            var posY = startPositionY + (50 * y);

            var alien = SI.alien(3)
                .addTo(scene)
                .setSpeed(0.5 + level / 2)
                .setPosition(posX, posY);
            aliens.push(alien);
        }
    }

    // корабли второго типа
    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 1; y++) {
            var posX = startPositionX - 60 + (60 * x);
            var posY = startPositionY + 40 + (50 * y);

            var alien = SI.alien(2)
                .addTo(scene)
                .setSpeed(0.5 + level / 2)
                .setPosition(posX, posY);
            aliens.push(alien);
        }
    }

    // корабли второго типа
    for (var x = 0; x < 8; x++) {
        for (var y = 0; y < 1; y++) {
            var posX = startPositionX - 60 + (60 * x);
            var posY = startPositionY + 80 + (50 * y);

            var alien = SI.alien(1)
                .addTo(scene)
                .setSpeed(0.5 + level / 2)
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

/**
 *  Обновляем состояние "чужих"
 *  проверяем колизии:
 *    -с пулей
 *    -с игроком
 */
function updateAliensGroup() {
    for (var i = 0, leng = aliens.length; i < leng; i++) {
        var alienWay = aliens[i].checkWay();
        if (currentWay !== alienWay) {
            currentWay = alienWay;
            setWayAliensGroup(currentWay);
        }

        if (aliens[i].getPositionY() + aliens[i].height / 2 >= scene.getHeight()) {
            gameOver();
        }

        // колизия "чужой" <--> "игрок"
        if (SI.detectColision(aliens[i], ship)) {
            gameOver();
        }

        // если пуля в полете
        if (ship.fire) {
            // колизия "чужой" <--> "пуля"
            if (SI.detectColision(aliens[i], ship.bullet)) {
                aliens.splice(i, 1);
                --leng;
                ship.bullet.setPosition(ship.getPositionX(), ship.getPositionY() - 24);
                ship.fire = false;
                score +=10;
                return;
            }
        }
        aliens[i].update();
    }
}

