var SI = SI || {};

SI.Scene = function (canvas) {
    canvas = canvas || "canvas";
    this.canvas = document.getElementById(canvas);
    var context = this.context = this.canvas.getContext('2d');

    this.sceneWidth = this.canvas.width || 800;
    this.sceneHeight = this.canvas.height || 600;


    context.fillStyle = '#000';
    context.clearRect(0, 0, this.sceneWidth, this.sceneHeight);
    context.beginPath();
    context.rect(0, 0, this.sceneWidth, this.sceneHeight);
    context.closePath();
    context.fill();
};

SI.Scene.prototype = {

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
        this.callback.apply(this, [this.context]);
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