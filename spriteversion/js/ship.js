/**
 * Класс корабля игрока
 *
 *
 */
SI.Ship = SI.Sprite.extend({
    key: {
        LEFT: 65,  // key A [97]
        RIGHT: 83, // key S [115]
        SHOT: 32   // key spacebar
    },

    speed: 2,
    bulletSpeed: 15,
    keyPressedList: {},

    init: function () {
        this.initImage('../images/player.png', 56, 40);
        this.bullet = SI.bullet();
        this.fire = false;
        this.name = "ship";

        if (window.addEventListener) {
            window.addEventListener('keydown', SI.bind(this.keySetState, this), false);
            window.addEventListener('keyup', SI.bind(this.keyRemoveFromList, this), false);
        } else if (window.attachEvent) {
            window.attachEvent('onkeydown', SI.bind(this.keySetState, this), false);
            window.attachEvent('onkeyup', SI.bind(this.keyRemoveFromList, this), false);
            console.log("ok");
        }

        return this;
    },

    addTo: function (scene) {
        this.context = scene.context;
        this._scene = scene;
        this.setPosition(scene.getWidth() / 2, scene.getHeight() - 50);
        this.bullet.addTo(this._scene);
        this.bullet.setPosition(this.getPositionX(), this.getPositionY() - 24);
        this.initDOM();
        this.draw();
        return this;
    },

    // Простите за такую подписку на клавиши :(
    keySetState: function (e) {
        if (!e) {
            e = window.event;
        }
        alert(e);

        if (e.keyCode === this.key.LEFT) {
            delete this.keyPressedList[this.key.RIGHT];
        }
        if (e.keyCode === this.key.RIGHT) {
            delete this.keyPressedList[this.key.LEFT];
        }
        this.keyPressedList[e.keyCode] = e;
    },


    keyRemoveFromList: function (e) {
        delete this.keyPressedList[e.keyCode];
    },


    keyEventHandler: function () {
        for (var keyCode in this.keyPressedList) {
            switch (+keyCode) {
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
                case this.key.SHOT:
                    this.fire = true;
                    break;
            }
        }
    },


    bulletUpdateState: function () {
        if (this.fire) {
            if (this.bullet.step()) {
                this.fire = false;
            }
        } else {
            this.bullet.setPosition(this.getPositionX(), this.getPositionY() - 24);
        }
        this.bullet.update();
    },

    update: function () {
        this.keyEventHandler();
        this.bulletUpdateState();
        this.draw();
        this.updateDOM();
        this.debbug();
    }

});

SI.ship = function () {
    return new SI.Ship();
};
