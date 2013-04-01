SI.Bullet = SI.Sprite.extend({

    speed: 5,

    init: function () {
        this.initImage('images/bullet.png', 10, 10);
        this.name = 'shell';
        return this;
    },

    step: function () {
        this.y = this.y - this.speed;
        this.setPosition(this.x, this.y );
        if (this.y <= 0)    return true;
    }
});

SI.bullet = function () {
    return new SI.Bullet();
};
