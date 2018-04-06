'use strict';

var View = function(app) {
    this.app = document.getElementById(app);
    this.Buffer();
};

View.prototype.Buffer = function() {

    var pics = [
        '/img/grizz.png',
        '/img/ice.png',
        '/img/panda.png',
        '/img/chloe.png',
        '/img/koala.png'
    ];

    for(var i = 0, length = pics.length; i < length; i++) {
        var pic = pics[i];
        this.Download(pic);
    }
};

View.prototype.Download = function(url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";
    req.onload = function() {
        console.info('File loaded', url);
    };
    req.send();
};

View.prototype.active = function(template) {
    var views = document.querySelectorAll('.js-view.active');
    for(var i = 0, length=views.length; i< length; i++) {
        views[i].removeClass('active');
    }

    var view = document.querySelector('.'+template);
    view.addClass('active');

    if (template === 'game.history') {
        var history = document.getElementById('game-history-list');
        window.scrollTo(0,history.scrollHeight);
    }
};

View.prototype.gameId = function(id) {
    document.getElementById('game-players-id').innerText = id;
};

View.prototype.gamePlayers = function(message) {
    var players = document.getElementById('game-players-list');
    var tr = document.createElement('TR');
    var th = document.createElement('TD');
    th.setAttribute('scope', 'row');

    var now = new Date();
    var hours = '0' + now.getHours();
    var minutes = '0' + now.getMinutes();
    var seconds = '0' + now.getSeconds();
    th.innerHTML = '[' + hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + '] ' + message;

    tr.appendChild(th);
    players.appendChild(tr);
};

View.prototype.mafiaPlayers = function(players) {
    var tablePlayers = document.getElementById('mafia-players-vote');

    while (tablePlayers.firstChild) {
        tablePlayers.removeChild(tablePlayers.firstChild);
    }

    for(var i = 0, length=players.length; i < length; i++ ) {
        var player  = players[i];
        var tr = document.createElement('TR');
        var th = document.createElement('TD');
        th.setAttribute('scope', 'row');
        th.setAttribute('id', player.id);

        var now = new Date();
        th.innerText = player.username;

        tr.appendChild(th);
        tr.setAttribute('id', player.id);
        tablePlayers.appendChild(tr);

        tr.addEventListener('click', function(e) {
            var elem = e.target;
            bus.emit('view.mafia-players.vote', {player_id: elem.getAttribute('id')})
        });
    }
};

View.prototype.courtPlayers = function(players) {
    var tablePlayers = document.getElementById('court-players-vote');

    while (tablePlayers.firstChild) {
        tablePlayers.removeChild(tablePlayers.firstChild);
    }

    for(var i = 0, length=players.length; i < length; i++ ) {
        var player  = players[i];
        var tr = document.createElement('TR');
        var th = document.createElement('TD');
        th.setAttribute('scope', 'row');
        th.setAttribute('id', player.id);

        var now = new Date();
        th.innerText = player.username;

        tr.appendChild(th);
        tr.setAttribute('id', player.id);
        tablePlayers.appendChild(tr);

        tr.addEventListener('click', function(e) {
            var elem = e.target;
            bus.emit('view.court-players.vote', {player_id: elem.getAttribute('id')})
        });
    }
};

View.prototype.girlPlayers = function(players) {
    var tablePlayers = document.getElementById('girl-players-choice');

    while (tablePlayers.firstChild) {
        tablePlayers.removeChild(tablePlayers.firstChild);
    }

    for(var i = 0, length=players.length; i < length; i++ ) {
        var player  = players[i];
        var tr = document.createElement('TR');
        var th = document.createElement('TD');
        th.setAttribute('scope', 'row');
        th.setAttribute('id', player.id);

        var now = new Date();
        th.innerText = player.username;

        tr.appendChild(th);
        tr.setAttribute('id', player.id);
        tablePlayers.appendChild(tr);

        tr.addEventListener('click', function(e) {
            var elem = e.target;
            bus.emit('view.girl-players.choice', {player_id: elem.getAttribute('id')})
        });
    }
};

View.prototype.doctorPlayers = function(players) {
    var tablePlayers = document.getElementById('doctor-players-choice');

    while (tablePlayers.firstChild) {
        tablePlayers.removeChild(tablePlayers.firstChild);
    }

    for(var i = 0, length=players.length; i < length; i++ ) {
        var player  = players[i];
        var tr = document.createElement('TR');
        var th = document.createElement('TD');
        th.setAttribute('scope', 'row');
        th.setAttribute('id', player.id);

        var now = new Date();
        th.innerText = player.username;

        tr.appendChild(th);
        tr.setAttribute('id', player.id);
        tablePlayers.appendChild(tr);

        tr.addEventListener('click', function(e) {
            var elem = e.target;
            bus.emit('view.doctor-players.choice', {player_id: elem.getAttribute('id')})
        });
    }
};

View.prototype.sheriffPlayers = function(players) {
    var tablePlayers = document.getElementById('sheriff-players-choice');

    while (tablePlayers.firstChild) {
        tablePlayers.removeChild(tablePlayers.firstChild);
    }

    for(var i = 0, length=players.length; i < length; i++ ) {
        var player  = players[i];
        var tr = document.createElement('TR');
        var th = document.createElement('TD');
        th.setAttribute('scope', 'row');
        th.setAttribute('id', player.id);

        var now = new Date();
        th.innerText = player.username;

        tr.appendChild(th);
        tr.setAttribute('id', player.id);
        tablePlayers.appendChild(tr);

        tr.addEventListener('click', function(e) {
            var elem = e.target;
            bus.emit('view.sheriff-players.choice', {player_id: elem.getAttribute('id')})
        });
    }
};

View.prototype.mafiaGreetingPlayers = function(players) {
    var tablePlayers = document.getElementById('mafia-greeting-players-list');

    while (tablePlayers.firstChild) {
        tablePlayers.removeChild(tablePlayers.firstChild);
    }

    for(var i = 0, length=players.length; i < length; i++ ) {
        var player  = players[i];
        var tr = document.createElement('TR');
        var th = document.createElement('TD');
        th.setAttribute('scope', 'row');

        th.innerText = player.username;

        tr.appendChild(th);
        tr.setAttribute('id', player.id);
        tablePlayers.appendChild(tr);
    }
};

View.prototype.showStartBtn = function() {
    var btn = document.getElementById('game-players-start-btn');
    btn.removeClass('hide');
};

View.prototype.history = function(message) {
    var players = document.getElementById('game-history-list');
    var tr = document.createElement('TR');
    var th = document.createElement('TD');
    th.setAttribute('scope', 'row');

    var now = new Date();
    var hours = '0' + now.getHours();
    var minutes = '0' + now.getMinutes();
    var seconds = '0' + now.getSeconds();
    th.innerHTML = '[' + hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + '] ' + message;
    tr.appendChild(th);
    players.appendChild(tr);
    window.scrollTo(0,players.scrollHeight);
};

View.prototype.role = function(role) {
    document.getElementById('view-citizens-greeting-role').innerText = getRoleName(role);
    document.getElementById('view-citizens-greeting-pic').src = getRolePicturePath(role);
};

View.prototype.sheriffResult = function(player) {
    var text = document.getElementById('sheriff-players-result-text');
    text.innerHTML = 'Игрок <b>' + player.username + '</b> на самом деле<br><h3>' + getRoleName(player.role) + '</h3>';
};

View.prototype.courtResult = function (out) {
    document.getElementById('court-result-out').innerHTML = out;
};

View.prototype.courtResultVote = function (vote) {
    var div = document.createElement('DIV');
    div.innerHTML = vote;
    document.getElementById('court-result-votes').appendChild(div);
};

View.prototype.courtResultClear = function () {
    document.getElementById('court-result-votes').innerHTML = '';
};

View.prototype.nightResult = function (out) {
    document.getElementById('night-result-out').innerHTML = out;
};

View.prototype.showRole = function () {
    document.querySelector('.citizens-greeting-role').removeClass('active');
    document.querySelector('.citizens-greeting-role-post').addClass('active');
};

View.prototype.showGameIdAndUsername = function () {
    var gameId = gameObj.getId();
    var username = gameObj.getUsername();

    if (!gameId && !username) {
        return false;
    }
    document.querySelector('.header').removeClass('hide');
    document.getElementById('header-game-id').innerHTML = gameId;
    document.getElementById('header-username').innerHTML = username;
};