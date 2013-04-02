/*
 * Thanks to Vladimir Agafonkin :)
 */

SI.Class = function () {};

SI.Class.extend = function (props) {
    var Class = function () {
        if (this.init) {
            this.init.apply(this, arguments);
        }
    };


    var F = function () {};
    F.prototype = this.prototype;
    var proto = new F();
    proto.constructor = Class;
    Class.prototype = proto;

    for (var i in this) {
        if (this.hasOwnProperty(i) && i !== 'prototype') {
            Class[i] = this[i];
        }
    }

    SI.extend(proto, props);

    var parent = this;
    Class.__super__ = parent.prototype;

    return Class;
};