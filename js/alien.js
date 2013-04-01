SI.Alien = SI.Sprite.extend({

    init: function (type) {
        this.initImage('images/alien_' + type + '.png', 40, 40);
        this.name ='bug';
        this.way = "left";// начальное направление движения
        this.speed = 1;
        return this;
    },

    setSpeed: function (speed) {
        this.speed = speed;
        return this;
    },


    /**
     * задаем направление движение корабля
     *  left or right
     */
    setWay: function (way) {
        this.way = way;
    },

    /**
     * Проверяем столкновение с бортиком:
     * - исли столкнулись - меняем направление движения
     */
    checkWay: function () {
        var side = 20; // расстояние по краям

        if (this.getPositionX() <= side && this.way === "left") {
            this.setWay("right");
        }
        if (this.getPositionX() >= (this._scene.getWidth() - side ) && this.way === 'right') {
            this.setWay("left");
        }
        return  this.way;
    },

    step: function () {
        if (this.way === 'left') {
            this.moveLeft(this.speed);
        } else if (this.way === 'right') {
            this.moveRight(this.speed);
        }
    },

    update: function () {
        this.step();
        this.draw();
        this.debbug();
    }

});

SI.alien = function (type) {
    return new SI.Alien(type);
};

