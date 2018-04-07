'use strict';

var Sound = function () {
    var version = '?v=' + Math.random();
    this.enable = true;

    this.sound = document.createElement('AUDIO');

    this.silence = 'audio/silence.mp3' + version;
    this.game_start = 'audio/game_start.mp3' + version;
    this.out = 'audio/out.mp3' + version;
    this.citizen_win = 'audio/citizen_win.mp3' + version;
    this.mafia_win = 'audio/mafia_win.mp3' + version;
    this.citizens_greeting_start = 'audio/citizens_greeting_start.mp3' + version;
    this.citizens_greeting_end = 'audio/citizens_greeting_end.mp3' + version;
    this.day_start = 'audio/day_start.mp3' + version;
    this.night_start = 'audio/night_start.mp3' + version;
    this.mafia_start = 'audio/mafia_start.mp3' + version;
    this.mafia_end = 'audio/mafia_end.mp3' + version;
    this.court_start = 'audio/court_start.mp3' + version;
    this.court_end = 'audio/court_end.mp3' + version;
    this.court_out_nobody = 'audio/court_out_nobody.mp3' + version;
    this.doctor_start = 'audio/doctor_start.mp3' + version;
    this.doctor_end = 'audio/doctor_end.mp3' + version;//todo
    this.girl_start = 'audio/girl_start.mp3' + version;
    this.girl_end = 'audio/girl_end.mp3' + version;//todo
    this.sheriff_start = 'audio/sheriff_start.mp3' + version;
    this.sheriff_end = 'audio/sheriff_end.mp3' + version;

    this.WarmCache();
};

Sound.prototype.setEnable = function (enable) {
    console.debug('Sound is ' + (enable ? 'enable' : 'disable'));
    this.enable = enable;
};

Sound.prototype.Init = function () {
    this.Play(this.silence);
};

Sound.prototype.WarmCache = function () {

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
        this.out,
        this.citizen_win,
        this.mafia_win,
        this.court_out_nobody,
        this.doctor_start,
        this.doctor_end,
        this.girl_start,
        this.girl_end,
        this.sheriff_start,
        this.sheriff_end
    ];

    for (var i = 0, length = sounds.length; i < length; i++) {
        var sound = sounds[i];
        this.Download(sound);
    }
};

Sound.prototype.Download = function (url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";
    req.onload = function () {
        console.info('File loaded', url);
    };
    req.send();
};

Sound.prototype.Play = function (sound, callback, delay) {
    console.debug('sound play start', sound);

    if (!this.enable) {
        callback && callback();

        return;
    }

    var end = function () {

        if (delay) {
            setTimeout(function () {
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

Sound.prototype.gameStart = function (callback, delay) {
    this.Play(this.game_start, callback, delay);
};

Sound.prototype.citizensGreetingStart = function (callback, delay) {
    this.Play(this.citizens_greeting_start, callback, delay);
};

Sound.prototype.citizensGreetingEnd = function (callback, delay) {
    this.Play(this.citizens_greeting_end, callback, delay);
};

Sound.prototype.dayStart = function (callback, delay) {
    this.Play(this.day_start, callback, delay);
};

Sound.prototype.nightStart = function (callback, delay) {
    this.Play(this.night_start, callback, delay);
};

Sound.prototype.mafiaStart = function (callback, delay) {
    this.Play(this.mafia_start, callback, delay);
};

Sound.prototype.mafiaEnd = function (callback, delay) {
    this.Play(this.mafia_end, callback, delay);
};

Sound.prototype.courtStart = function (callback, delay) {
    this.Play(this.court_start, callback, delay);
};

Sound.prototype.courtEnd = function (callback, delay) {
    this.Play(this.court_end, callback, delay);
};

Sound.prototype.playerOut = function (callback, delay) {
    this.Play(this.out, callback, delay);
};

Sound.prototype.mafiaWin = function (callback, delay) {
    this.Play(this.mafia_win, callback, delay);
};

Sound.prototype.citizenWin = function (callback, delay) {
    this.Play(this.citizen_win, callback, delay);
};

Sound.prototype.courtOutNobody = function (callback, delay) {
    this.Play(this.court_out_nobody, callback, delay);
};

Sound.prototype.doctorStart = function (callback, delay) {
    this.Play(this.doctor_start, callback, delay);
};

Sound.prototype.doctorEnd = function (callback, delay) {
    this.Play(this.doctor_end, callback, delay);
};

Sound.prototype.girlStart = function (callback, delay) {
    this.Play(this.girl_start, callback, delay);
};

Sound.prototype.girlEnd = function (callback, delay) {
    this.Play(this.girl_end, callback, delay);
};

Sound.prototype.sheriffStart = function (callback, delay) {
    this.Play(this.sheriff_start, callback, delay);
};

Sound.prototype.sheriffEnd = function (callback, delay) {
    this.Play(this.sheriff_end, callback, delay);
};
