'use strict';

var Sound = function() {
    this.seed = '?v=' + Math.random();
    this.enable = true;

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

Sound.prototype.Play = function(sound, callback, delay) {
    console.debug('sound play start', sound);

    if(!this.enable) {
        callback && callback();

        return;
    }

    var end = function() {

        if(delay){
            setTimeout(function() {
                callback && callback();
            }, delay)
        } else {
            callback && callback();
        }

        this.sound.removeEventListener('ended', end);
        console.debug('sound play done', sound);
    }.bind(this);

    this.sound.src = sound;
    this.sound.addEventListener('ended', end);
    this.sound.play();
};

Sound.prototype.gameStart = function(callback, delay) {
    this.Play(this.game_start, callback, delay);
};

Sound.prototype.citizensGreetingStart = function(callback, delay) {
    this.Play(this.citizens_greeting_start, callback, delay);
};

Sound.prototype.citizensGreetingEnd = function(callback, delay) {
    this.Play(this.citizens_greeting_end, callback, delay);
};

Sound.prototype.dayStart = function(callback, delay) {
    this.Play(this.day_start, callback, delay);
};

Sound.prototype.nightStart = function(callback, delay) {
    this.Play(this.night_start, callback, delay);
};

Sound.prototype.mafiaStart = function(callback, delay) {
    this.Play(this.mafia_start, callback, delay);
};

Sound.prototype.mafiaEnd = function(callback, delay) {
    this.Play(this.mafia_end, callback, delay);
};

Sound.prototype.courtStart = function(callback, delay) {
    this.Play(this.court_start, callback, delay);
};

Sound.prototype.courtEnd = function(callback, delay) {
    this.Play(this.court_end, callback, delay);
};

Sound.prototype.courtOutOne = function(callback, delay) {
    this.Play(this.court_out_one, callback, delay);
};

Sound.prototype.courtOutNobody = function(callback, delay) {
    this.Play(this.court_out_nobody, callback, delay);
};

Sound.prototype.doctorStart = function(callback, delay) {
    this.Play(this.doctor_start, callback, delay);
};

Sound.prototype.doctorEnd = function(callback, delay) {
    this.Play(this.doctor_end, callback, delay);
};

Sound.prototype.girlStart = function(callback, delay) {
    this.Play(this.girl_start, callback, delay);
};

Sound.prototype.girlEnd = function(callback, delay) {
    this.Play(this.girl_end, callback, delay);
};

Sound.prototype.sheriffStart = function(callback, delay) {
    this.Play(this.sheriff_start, callback, delay);
};

Sound.prototype.sheriffEnd = function(callback, delay) {
    this.Play(this.sheriff_end, callback, delay);
};
