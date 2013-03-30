var SI = SI || {};

SI.Scene = function (canvas) {
    canvas = canvas || "canvas";
    this.canvas = document.getElementById(canvas);
    var context = this.context = this.canvas.getContext('2d');

    this.width = this.canvas.width || 800;
    this.height = this.canvas.height || 600;


    context.fillStyle = '#000';
    context.clearRect(0, 0, this.width, this.height);
    context.beginPath();
    context.rect(0, 0, this.width, this.height);
    context.closePath();
    context.fill();
};

SI.Scene.prototype = {

    getWidth: function () {
        return this.width;
    },

    getHeight: function () {
        return this.height;
    },

    gameLoop: function (callback) {
        this.lastGameLoopFrame = new Date().getTime();
        this.callback = callback;
        this.loop = true;
        this._loopFrame = 0;
        window.requestAnimationFrame(this.gameLoopCallbackWrapper.bind(this));

    },


    gameLoopCallbackWrapper: function () {
        var now = new Date().getTime();
        this._loopFrame++;
        this.loop = window.requestAnimationFrame(this.gameLoopCallbackWrapper.bind(this));
        this.callback.call(this, this);
        this.lastGameLoopFrame = now;
    },


    pauseGame: function () {
        if (this.loop) {
            window.cancelRequestAnimFrame(this.loop);
        }
        this.loop = null;
    },

    unpauseGame: function () {
        if (!this.loop) {
            this.lastGameLoopFrame = new Date().getTime();
            this.loop = window.requestAnimationFrame(this.gameLoopCallbackWrapper.bind(this));
        }
    }
};

SI.scene = function (parametrs) {
    return new SI.Scene(parametrs);
};