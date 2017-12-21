'use strict';

var View = function(app) {
    this.app = document.getElementById(app);
};

View.prototype.active = function(template) {
    var views = document.querySelectorAll('.js-view.active');
    for(var i = 0, length=views.length; i< length; i++) {
        views[i].removeClass('active');
    }

    var view = document.querySelector('.'+template);
    view.addClass('active');
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
    th.innerHTML = '[' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '] ' + message;

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
    th.innerHTML = '[' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '] ' + message;
    tr.appendChild(th);
    players.appendChild(tr);
};

View.prototype.role = function(role) {
    document.getElementById('view-citizens-greeting-role').innerText = role;
};