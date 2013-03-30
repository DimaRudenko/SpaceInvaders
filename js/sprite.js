SI.Sprite = SI.Class.extend({
    /**
     * Initialize sprite image and size
     *
     * @param src
     * @param width
     * @param height
     */
    initImage: function (src, width, height) {
        this.image = new Image();
        this.image.src = src;
        this.width = width;
        this.height = height;
    },

    initPosition: function (x, y) {
        this.x = x;
        this.y = y;
    },

    setPosition: function (x, y) {
        this.x = x;
        this.y = y;
    },


    draw: function () {
        var x = this.x - (this.width / 2);
        var y = this.y - (this.height / 2);
        this.context.drawImage(this.image, x, y);
    },


    moveLeft: function (value) {
        this.setPosition(this.x - value, this.y);
    },


    moveRight: function (value) {
        this.setPosition(this.x + value, this.y);
    },


    moveFront: function (value) {
        this.setPosition(this.x, this.y + (value * 3));
    },

    addTo: function(scene){
        this.context =scene.context;
    }

});

SI.sprite = function () {
    return new SI.Sprite();
};