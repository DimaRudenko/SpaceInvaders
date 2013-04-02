
(function initGame() {

    aliens = [];
    ship = {};
    scene = {};
    bang ={},
    currentWay = 'left';
    level = 1;
    score = 0;
    pause = false;
    gameover = false;
    restart = false;
    runGame = false;

    scene = SI.scene("canvas");
    scene.initDOM();

    var context = scene.context;

    ship = SI.ship().addTo(scene);
    initAliens();

    updateAliensGroup();
    ship.update();

    bang = SI.bang();
    bang.addTo(scene);

    context.fillStyle = "rgba(0, 0, 0, 1)";
    context.fillRect(0, 0, scene.width, scene.height);
    context.strokeStyle = 'white';
    context.textAlign = 'center';
    context.font = '20pt Arial';
    context.strokeText('Press Start button ', scene.getWidth() / 2, scene.getHeight() / 2 );
}());


/**
 * новый уровень
 */
function levelUp() {
    level++;
    initAliens();
}

function GameStart() {
    scene.gameLoop(function (scene) {
        stats.begin();

        var context = scene.context;
        context.fillStyle = "rgba(0, 0, 0, 1)";
        context.fillRect(0, 0, this.width, this.height);


        context.font = 'bold 10pt Arial';
        context.fillStyle = "rgba(211, 211, 211, 1)";
        context.fillText('Level:  ' + level, 30, 20);
        context.fillText('Score:  ' + score, scene.getWidth() - 80, 20);

        if (aliens.length === 0) {
            levelUp();
        }

        updateAliensGroup();
        ship.update();

        stats.end();
    });
}


function GameOver() {
    scene.gameLoop(function (scene) {
        var context = scene.context;
        context.fillStyle = "rgba(0, 0, 0, 1)";
        context.fillRect(0, 0, this.width, this.height);

        context.strokeStyle = 'white';
        context.textAlign = 'center';
        context.font = "bold 30pt Arial";
        context.strokeText("Game Over", scene.getWidth() / 2, scene.getHeight() / 2);
        context.font = "bold 12pt Arial";
        context.strokeText("You score: " + score, scene.getWidth() / 2, scene.getHeight() / 2 + 30);
        context.font = '10pt Arial';
        context.strokeText('press start button ', scene.getWidth() / 2, scene.getHeight() / 2 + 60);

    });
    if (scene.versionDOM) {
        deleteDomAliensGroup();
        ship.deleteDOM();
        ship.bullet.deleteDOM();
        alert("Game Over\n You score:" + score + "");
    }
}


function GamePause() {
    if (pause) {
        scene.unpauseGame();
        pause = false;
    } else {
        scene.pauseGame();
        pause = true;
    }

}
function GameReset(){
    location.reload();
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
            GameOver();
        }

        // колизия "чужой" <--> "игрок"
        if (SI.detectColision(aliens[i], ship)) {
            GameOver();
        }

        // если пуля в полете
        if (ship.fire) {
            // колизия "чужой" <--> "пуля"
            if (SI.detectColision(aliens[i], ship.bullet)) {
                aliens[i].deleteDOM(); //debug
                aliens.splice(i, 1);
                --leng;
                ship.bullet.setPosition(ship.getPositionX(), ship.getPositionY() - 24);
                ship.fire = false;
                score += 10;
                return;
            }
        }
        aliens[i].update();
    }
}

function deleteDomAliensGroup() {
    for (var i = 0, leng = aliens.length; i < leng; i++) {
        aliens[i].deleteDOM();
    }
}