SI.Ship = SI.Sprite.extend({
    init: function (src, width, height) {
      //  this.initImage(src, width, height);
    }
});

SI.ship = function ( src, width, height) {
    return new SI.Ship(src, width, height);
};
