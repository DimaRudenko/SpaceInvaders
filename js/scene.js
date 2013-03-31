var SI = SI || {};

SI.Scene = function (canvas) {
    canvas = canvas || "canvas";
    this.canvas = document.getElementById(canvas);
    var context = this.context = this.canvas.getContext('2d');

    this.width = this.canvas.width || 800;
    this.height = this.canvas.height || 600;
};

SI.Scene.prototype = {

    getWidth: function () {
        return this.width;
    },

    getHeight: function () {
        return this.height;
    },

    gameLoop: function (callback) {
        this.callback = callback;
        this.loop = true;
        this._loopFrame = 0;
        window.requestAnimationFrame(this.gameLoopCallback.bind(this));
    },

    gameLoopCallback: function () {
        this._loopFrame++;
        this.loop = window.requestAnimationFrame(this.gameLoopCallback.bind(this));
        this.callback.call(this, this);
    },

    pauseGame: function () {
        if (this.loop) {
            window.cancelRequestAnimFrame(this.loop);
        }
        this.loop = false;
    },

    unpauseGame: function () {
        if (!this.loop) {
            this.loop = window.requestAnimationFrame(this.gameLoopCallback.bind(this));
        }
    }
};

SI.scene = function (parametrs) {
    return new SI.Scene(parametrs);
};