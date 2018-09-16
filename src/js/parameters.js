'use strict';

var Parameters = function (params) {
    this.gameId = params['gameId'] || null;
    this.username = params['username'] || '';
    this.master = !!parseInt(params['master']);
    this.sound = ('undefined' !== typeof params['sound']) ? !!parseInt(params['sound']) : true;
    this.test = !!parseInt(params['test']);
    this.testUsersCount = parseInt(params['testUsersCount']) || 3;
    this.testAutoStart = !!parseInt(params['testAutoStart']);
    this.testTimeout = parseInt(params['testTimeout']) || 10;
    this.storageUrl = !!parseInt(params['storageUrl']);
    console.info({
        gameId: this.gameId,
        username: this.username,
        master: this.master,
        sound: this.sound,
        test: this.test,
        testUsersCount: this.testUsersCount,
        testAutoStart: this.testAutoStart,
        testTimeout: this.testTimeout,
        storageUrl: this.storageUrl
    });
};

Parameters.prototype.getGameId = function () {
    return this.gameId;
};

Parameters.prototype.isSoundEnabled = function () {
    return this.sound;
};

Parameters.prototype.getUsername = function () {
    return this.username;
};

Parameters.prototype.isMaster = function () {
    return this.master;
};

Parameters.prototype.isTest = function () {
    return this.test;
};

Parameters.prototype.getTestUsersCount = function () {
    return this.testUsersCount;
};

Parameters.prototype.isTestAutoStart = function () {
    return this.testAutoStart;
};

Parameters.prototype.getTestTimeout = function () {
    return this.testTimeout;
};

Parameters.prototype.isStorageUrl = function () {
    return this.storageUrl;
};
