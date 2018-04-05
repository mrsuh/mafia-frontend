'use strict';

var Game = function() {
    this.id = null;
    this.userId = null;
    this.username = null;
    this.master = false;
};

Game.prototype.setId = function (gameId) {
    localStorage.setItem('gameId', gameId)
};

Game.prototype.getId = function () {
    return parseInt(localStorage.getItem('gameId'));
};

Game.prototype.setUserId = function (userId) {
    localStorage.setItem('userId', userId)
};

Game.prototype.getUserId = function () {
    return parseInt(localStorage.getItem('userId'));
};

Game.prototype.setUsername = function (username) {
    localStorage.setItem('username', username)
};

Game.prototype.getUsername = function () {
    return localStorage.getItem('username')
};

Game.prototype.setMaster = function (master) {
    localStorage.setItem('master', master)
};

Game.prototype.getMaster = function () {
    return !!localStorage.getItem('master')
};