/**
 * новый уровень
 */
function levelUp() {
    level++;
    initAliens();
}

function gameStart(scene) {
    stats.begin();

    var context = scene.context;

    context.fillStyle = "rgba(0, 0, 0, 1)";
    context.fillRect(0, 0, this.width, this.height);


    context.font = 'bold 10pt Arial';
    context.fillStyle = "rgba(211, 211, 211, 1)";
    context.fillText('Level:  ' + level, 20, 20);
    context.fillText('Score:  ' + score, scene.getWidth()-80, 20);

    if (aliens.length === 0) {
        levelUp();
    }
    updateAliensGroup();
    ship.update();

    stats.end();
}

function gameOver() {
    scene.gameLoop(function (scene) {
        var context = scene.context;

        context.fillStyle = "rgba(0, 0, 0, 1)";
        context.fillRect(0, 0, this.width, this.height);

        context.strokeStyle = 'white';
        context.textAlign = 'center';
        context.font = "bold 30pt Arial";
        context.strokeText("Game Over", scene.getWidth() / 2, scene.getHeight() / 2);
        context.strokeText("You score: "+ score, scene.getWidth() / 2, scene.getHeight() / 2 +40);
        context.font = '10pt Arial';
        context.strokeText('press start  ', scene.getWidth() / 2, scene.getHeight() / 2 + 60);

    });
}