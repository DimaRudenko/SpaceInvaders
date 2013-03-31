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
    context.beginPath();
    context.rect(0, 0, this.width, this.height);
    context.closePath();
    context.fill();
    context.font = '10pt Arial';
    context.strokeStyle = 'white';
    context.strokeText('Level:  ' + level, 20, 20);
    context.strokeText('Score:  ' + score, scene.getWidth()-80, 20);

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
        context.beginPath();
        context.fillRect(0, 0, this.width, this.height);
        context.closePath();
        context.strokeStyle = 'white';
        context.textAlign = 'center';
        context.font = "bold 30pt Arial";
        context.strokeText("Game Over", scene.getWidth() / 2, scene.getHeight() / 2);
        context.font = '10pt Arial';
        context.strokeText('press start  ', scene.getWidth() / 2, scene.getHeight() / 2 + 50);

    });
}