SI.Bang = SI.Sprite.extend({

    init: function () {
        this.initImage('../images/bang.png', 20, 20);
        this.name = 'bang';
        return this;
    }

});

SI.bang = function () {
    return new SI.Bang();
};
