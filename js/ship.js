SI.Ship = SI.Sprite.extend({
    key: {
        LEFT: 65,  // key A
        RIGHT: 83, // key S
        SHOT: 32   // key spacebar
    },
    speed: 5.5,

    init: function () {
        this.initImage('images/player.png', 56, 40);
        return this;
    },

    addTo: function (scene) {
        this.context = scene.context;
        this._scene = scene;
        window.addEventListener('keydown', SI.bind(this.keyEvent, this), false);
        return this;
    },

    keyEvent: function (e) {

        var keyCode = e.keyCode;

        switch (keyCode) {
            case this.key.LEFT:
                if ((this.getPositionX() - this.width / 2 - this.speed) >= 0) {
                    this.moveLeft(this.speed);
                }
                break;
            case this.key.RIGHT:
                if ((this.getPositionX() + this.width / 2 + this.speed) <= this._scene.getWidth()) {
                    this.moveRight(this.speed);
                }

                break;
            case this.SPACE_KEY:
                // shot
                break;
        }

    }

});

SI.ship = function () {
    return new SI.Ship();
};
