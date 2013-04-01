var SI = SI || {};

SI.Scene = function (canvas) {
    canvas = canvas || "canvas";
    this.canvas = document.getElementById(canvas);
    this.context = this.canvas.getContext('2d');

    this.width = this.canvas.width || 800;
    this.height = this.canvas.height || 600;
    this.debugg = true;
    this.versionDOM = true;
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
    },

    /**
     * DOM версия рендера
     * @type {HTMLElement}
     */
    initDOM: function () {
        if(this.versionDOM){
            var domElement = this.domElement = document.createElement('DIV');
            domElement.id = "screen";
            domElement.style.width = this.width + 'px';
            domElement.style.height = this.height + 'px';
            domElement.style.position = 'absolute';
            domElement.style.background = "black";
            var wrapper = document.getElementById("wrapper");
            wrapper.appendChild(domElement);
        }
    },

    /**
     *
     * Детектим ИЕ8
     */
    detectIE: function () {
        if (navigator.userAgent.match(/MSIE\s(?!8.0)/)) {
            return true;
        }
        return false;
    }
};

SI.scene = function (parametrs) {
    return new SI.Scene(parametrs);
};