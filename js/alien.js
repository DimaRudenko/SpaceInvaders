SI.Alien = SI.Sprite.extend({

    init: function (type) {
        this.initImage('images/alien_' + type + '.png', 40, 40);
        return this;
    }

});

SI.alien = function (type) {
    return new SI.Alien(type);
};

