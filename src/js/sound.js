'use strict';

var Sound = function() {
    this.seed = '?v=' + Math.random();

    this.sound = document.createElement('AUDIO');

    this.silence = 'audio/silence.mp3' + this.seed;
    this.game_start = 'audio/game_start.mp3' + this.seed;
    this.citizens_greeting_start = 'audio/citizens_greeting_start.mp3' + this.seed;
    this.citizens_greeting_end = 'audio/citizens_greeting_end.mp3' + this.seed;
    this.day_start = 'audio/day_start.mp3' + this.seed;
    this.night_start = 'audio/night_start.mp3' + this.seed;
    this.mafia_start = 'audio/mafia_start.mp3' + this.seed;
    this.mafia_end = 'audio/mafia_end.mp3' + this.seed;
    this.court_start = 'audio/court_start.mp3' + this.seed;
    this.court_end = 'audio/court_end.mp3' + this.seed;
    this.court_out_one = 'audio/court_out_one.mp3' + this.seed;
    this.court_out_nobody = 'audio/court_out_nobody.mp3' + this.seed;
    this.doctor_start = 'audio/doctor_start.mp3' + this.seed;
    this.doctor_end = 'audio/doctor_end.mp3' + this.seed;//todo
    this.girl_start = 'audio/girl_start.mp3' + this.seed;
    this.girl_end = 'audio/girl_end.mp3' + this.seed;//todo
    this.sheriff_start = 'audio/sheriff_start.mp3' + this.seed;
    this.sheriff_end = 'audio/sheriff_end.mp3' + this.seed;

    this.Buffer();
};

Sound.prototype.Init = function() {
    this.Play(this.silence);
};

Sound.prototype.Buffer = function() {

    var sounds = [
        this.game_start,
        this.citizens_greeting_start,
        this.citizens_greeting_end,
        this.day_start,
        this.night_start,
        this.mafia_start,
        this.mafia_end,
        this.court_start,
        this.court_end,
        this.court_out_one,
        this.court_out_nobody,
        this.doctor_start,
        this.doctor_end,
        this.girl_start,
        this.girl_end,
        this.sheriff_start,
        this.sheriff_end
    ];

    for(var i = 0, length = sounds.length; i < length; i++) {
        var sound = sounds[i];
        this.Download(sound);
    }
};

Sound.prototype.Download = function(url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";
    req.onload = function() {
        console.info('File loaded', url);
    };
    req.send();
};

Sound.prototype.Play = function(sound, callback) {
    console.debug('sound play start', sound);

    var end = function() {
        callback && callback();
        this.sound.removeEventListener('ended', end);
        console.debug('sound play done', sound);
    }.bind(this);

    this.sound.src = sound;
    this.sound.addEventListener('ended', end);
    this.sound.play();
};

Sound.prototype.gameStart = function(callback) {
    this.Play(this.game_start, callback);
};

Sound.prototype.citizensGreetingStart = function(callback) {
    this.Play(this.citizens_greeting_start, callback);
};

Sound.prototype.citizensGreetingEnd = function(callback) {
    this.Play(this.citizens_greeting_end, callback);
};

Sound.prototype.dayStart = function(callback) {
    this.Play(this.day_start, callback);
};

Sound.prototype.nightStart = function(callback) {
    this.Play(this.night_start, callback);
};

Sound.prototype.mafiaStart = function(callback) {
    this.Play(this.mafia_start, callback);
};

Sound.prototype.mafiaEnd = function(callback) {
    this.Play(this.mafia_end, callback);
};

Sound.prototype.courtStart = function(callback) {
    this.Play(this.court_start, callback);
};

Sound.prototype.courtEnd = function(callback) {
    this.Play(this.court_end, callback);
};

Sound.prototype.courtOutOne = function(callback) {
    this.Play(this.court_out_one, callback);
};

Sound.prototype.courtOutNobody = function(callback) {
    this.Play(this.court_out_nobody, callback);
};

Sound.prototype.doctorStart = function(callback) {
    this.Play(this.doctor_start, callback);
};

Sound.prototype.doctorEnd = function(callback) {
    this.Play(this.doctor_end, callback);
};

Sound.prototype.girlStart = function(callback) {
    this.Play(this.girl_start, callback);
};

Sound.prototype.girlEnd = function(callback) {
    this.Play(this.girl_end, callback);
};

Sound.prototype.sheriffStart = function(callback) {
    this.Play(this.sheriff_start, callback);
};

Sound.prototype.sheriffEnd = function(callback) {
    this.Play(this.sheriff_end, callback);
};
