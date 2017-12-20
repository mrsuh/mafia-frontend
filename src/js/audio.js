'use strict';

var Audio = function() {
    this.seed = '?v=' + Math.random();

    this.game_start = document.createElement('AUDIO');
    this.game_start.src = 'dist/audio/game_start.mp3' + this.seed;

    this.citizens_greeting_start = document.createElement('AUDIO');
    this.citizens_greeting_start.src = 'dist/audio/citizens_greeting_start.mp3' + this.seed;

    this.citizens_greeting_end = document.createElement('AUDIO');
    this.citizens_greeting_end.src = 'dist/audio/citizens_greeting_end.mp3' + this.seed;

    this.day_start = document.createElement('AUDIO');
    this.day_start.src = 'dist/audio/day_start.mp3' + this.seed;

    this.night_start = document.createElement('AUDIO');
    this.night_start.src = 'dist/audio/night_start.mp3' + this.seed;

    this.mafia_greeting_start = document.createElement('AUDIO');
    this.mafia_greeting_start.src = 'dist/audio/mafia_greeting_start.mp3' + this.seed;

    this.mafia_greeting_end = document.createElement('AUDIO');
    this.mafia_greeting_end.src = 'dist/audio/mafia_greeting_start.mp3' + this.seed; //todo

    this.mafia_start = document.createElement('AUDIO');
    this.mafia_start.src = 'dist/audio/mafia_start.mp3' + this.seed;

    this.mafia_end = document.createElement('AUDIO');
    this.mafia_end.src = 'dist/audio/mafia_end.mp3' + this.seed;

    this.court_start = document.createElement('AUDIO');
    this.court_start.src = 'dist/audio/court_start.mp3' + this.seed;

    this.court_end = document.createElement('AUDIO');
    this.court_end.src = 'dist/audio/court_end.mp3' + this.seed;

    this.court_out_one = document.createElement('AUDIO');
    this.court_out_one.src = 'dist/audio/court_out_one.mp3' + this.seed;

    this.court_out_nobody = document.createElement('AUDIO');
    this.court_out_nobody.src = 'dist/audio/court_out_nobody.mp3' + this.seed;

    this.doctor_start = document.createElement('AUDIO');
    this.doctor_start.src = 'dist/audio/doctor_start.mp3' + this.seed;

    this.doctor_end = document.createElement('AUDIO');
    this.doctor_end.src = 'dist/audio/doctor_end.mp3' + this.seed;//todo

    this.girl_start = document.createElement('AUDIO');
    this.girl_start.src = 'dist/audio/girl_start.mp3' + this.seed;

    this.girl_end = document.createElement('AUDIO');
    this.girl_end.src = 'dist/audio/girl_end.mp3' + this.seed;//todo

    this.sheriff_start = document.createElement('AUDIO');
    this.sheriff_start.src = 'dist/audio/sheriff_start.mp3' + this.seed;

    this.sheriff_end = document.createElement('AUDIO');
    this.sheriff_end.src = 'dist/audio/sheriff_end.mp3' + this.seed;
};

Audio.prototype.gameStart = function(callback) {
    this.game_start.addEventListener('ended', callback);
    this.game_start.play();
};

Audio.prototype.citizensGreetingStart = function(callback) {
    this.citizens_greeting_start.addEventListener('ended', callback);
    this.citizens_greeting_start.play();
};

Audio.prototype.citizensGreetingEnd = function(callback) {
    this.citizens_greeting_end.addEventListener('ended', callback);
    this.citizens_greeting_end.play();
};

Audio.prototype.dayStart = function(callback) {
    this.day_start.addEventListener('ended', callback);
    this.day_start.play();
};

Audio.prototype.nightStart = function(callback) {
    this.night_start.addEventListener('ended', callback);
    this.night_start.play();
};

Audio.prototype.mafiaGreetingStart = function(callback) {
    this.mafia_greeting_start.addEventListener('ended', callback);
    this.mafia_greeting_start.play();
};

Audio.prototype.mafiaGreetingEnd = function(callback) {
    this.mafia_greeting_end.addEventListener('ended', callback);
    this.mafia_greeting_end.play();
};

Audio.prototype.mafiaStart = function(callback) {
    this.mafia_start.addEventListener('ended', callback);
    this.mafia_start.play();
};

Audio.prototype.mafiaEnd = function(callback) {
    this.mafia_end.addEventListener('ended', callback);
    this.mafia_end.play();
};

Audio.prototype.courtStart = function(callback) {
    this.court_start.addEventListener('ended', callback);
    this.court_start.play();
};

Audio.prototype.courtEnd = function(callback) {
    this.court_end.addEventListener('ended', callback);
    this.court_end.play();
};

Audio.prototype.courtOutOne = function(callback) {
    this.court_out_one.addEventListener('ended', callback);
    this.court_out_one.play();
};

Audio.prototype.courtOutNobody = function(callback) {
    this.court_out_nobody.addEventListener('ended', callback);
    this.court_out_nobody.play();
};

Audio.prototype.doctorStart = function(callback) {
    this.doctor_start.addEventListener('ended', callback);
    this.doctor_start.play();
};

Audio.prototype.doctorEnd = function(callback) {
    this.doctor_end.addEventListener('ended', callback);
    this.doctor_end.play();
};

Audio.prototype.girlStart = function(callback) {
    this.girl_start.addEventListener('ended', callback);
    this.girl_start.play();
};

Audio.prototype.girlEnd = function(callback) {
    this.girl_end.addEventListener('ended', callback);
    this.girl_end.play();
};

Audio.prototype.sheriffStart = function(callback) {
    this.sheriff_start.addEventListener('ended', callback);
    this.sheriff_start.play();
};

Audio.prototype.sheriffEnd = function(callback) {
    this.sheriff_end.addEventListener('ended', callback);
    this.sheriff_end.play();
};
