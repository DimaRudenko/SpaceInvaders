
/*
 * Copyright (c) 2013, Dima Rudenko
 * uawebconf 2013
 */

// Space Invaders namespace
var SI = SI ||{};

SI.extend = function (obj, source) {
        if (!source) { return obj; }

        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                obj[prop] = source[prop];
            }
        }
        return obj;
    };

  SI.bind =  function (fn, obj) {
        var args = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
        return function () {
            return fn.apply(obj, args || arguments);
        };
    };

/**
 * Provides requestAnimationFrame in a cross browser way.
 * @author paulirish  http://paulirish.com/
 */

if (!window.requestAnimationFrame) {

    window.requestAnimationFrame = (function () {

        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {

                window.setTimeout(callback, 1000 / 60);

            };

    })();
}

if (!window.cancelRequestAnimFrame) {

    window.cancelRequestAnimFrame = (function () {

        return window.cancelAnimationFrame ||
            window.webkitCancelRequestAnimationFrame ||
            window.mozCancelRequestAnimationFrame ||
            window.oCancelRequestAnimationFrame ||
            window.msCancelRequestAnimationFrame ||
            clearTimeout;
    })();
}