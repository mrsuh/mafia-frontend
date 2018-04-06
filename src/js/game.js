'use strict';

var Game = function (saveToUrl) {
    this.saveToUrl = saveToUrl;
    this.id = null;
    this.userId = null;
    this.username = null;
};

Game.prototype.setToLocalStorage = function (key, value) {
    localStorage.setItem(key, value)
};

Game.prototype.getFromLocalStorage = function (key) {
    localStorage.getItem(key)
};

Game.prototype.setToUrl = function (key, value) {
    var params = getJsonFromUrl();
    console.info(params);
    params[key] = value;
    var search = '';
    for (var prop in params) {
        if (!params.hasOwnProperty(prop)) {
            continue
        }
        console.info(prop, params[prop]);
        search += '&' + prop + '=' + params[prop]
    }

    window.history.pushState('', '', window.location.pathname + search.replace(/^&/, '?'));
};

Game.prototype.getFromUrl = function (key) {
    var params = getJsonFromUrl();
    return params[key];
};

Game.prototype.set = function (key, value) {
    if (this.saveToUrl) {
        return this.setToUrl(key, value);
    } else {
        return this.setToLocalStorage(key, value);
    }
};

Game.prototype.get = function (key) {
    if (this.saveToUrl) {
        return this.getFromUrl(key);
    } else {
        return this.getFromLocalStorage(key);
    }
};

Game.prototype.setId = function (gameId) {
    this.set('gameId', gameId)
};

Game.prototype.getId = function () {
    return parseInt(this.get('gameId'));
};

Game.prototype.setUserId = function (userId) {
    this.set('userId', userId)
};

Game.prototype.getUserId = function () {
    return parseInt(this.get('userId'));
};

Game.prototype.setUsername = function (username) {
    this.set('username', username)
};

Game.prototype.getUsername = function () {
    return this.get('username')
};