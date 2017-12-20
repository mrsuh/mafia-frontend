var GameEvent = function (game, bus, view) {
    this.game = game;
    this.bus = bus;
    this.event = 'game';
    this.view = view;
    this.players = [];

    this.bus.addListener('game.create', function (msg) {
        this.createAction(msg)
    }.bind(this));

    this.bus.addListener('game.join', function (msg) {
        this.joinAction(msg)
    }.bind(this));

    this.bus.addListener('game.end', function (msg) {
        this.endAction(msg)
    }.bind(this));

    this.bus.addListener('game.players', function (msg) {
        this.playersAction(msg)
    }.bind(this));

    this.bus.addListener('game.over', function (msg) {
        this.overAction(msg)
    }.bind(this));

    this.bus.addListener('view.game-start.create', function(msg) {
        this.bus.emit('sendmessage', {event: this.event, action: 'create', username: msg.username, game_id: ''});
    }.bind(this));

    this.bus.addListener('view.game-start.join', function(msg) {
        this.game.id = msg.game_id;
        this.view.gameId(this.game.id);
        this.bus.emit('sendmessage', {event: this.event, action: 'join', username: msg.username, game_id: msg.game_id});
    }.bind(this));

    this.bus.addListener('view.game-players.start', function(msg) {
            this.bus.emit('sendmessage', {event: this.event, action: 'start'});
    }.bind(this));
};

GameEvent.prototype.createAction = function (msg) {
    console.info('GAME.CREATE', msg);
    this.game.id = msg.game_id;
    this.game.userId = msg.player.id;
    this.game.username = msg.player.username;
    this.game.master = true;

    this.view.gameId(this.game.id);
    this.view.showStartBtn();
};

GameEvent.prototype.joinAction = function (msg) {
    console.info('GAME.JOIN', msg);

    this.game.userId = msg.player.id;
    this.game.username = msg.player.username;

    console.info(this.game);
};

GameEvent.prototype.endAction = function (msg) {
    this.view.history('Игра началась');
    audio.gameStart(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'ended'});
    }.bind(this))
};

GameEvent.prototype.playersAction = function (msg) {
    var players = msg.players;

    console.info('GAME.PLAYERS', msg);
    this.view.active('game-players');
    for(var i = 0, length = players.length; i < length; i++) {
        var player_id = players[i].id;

        if(this.players[player_id]) {
            continue;
        }
        this.players[player_id] = players[i];
        var msg = 'К игре присоединился игрок ' + players[i].username;
        this.view.gamePlayers(msg);
        this.view.history(msg);
    }
};


GameEvent.prototype.overAction = function (msg) {
    console.info('GAME.OVER', msg);

    var winner = '';
    switch(msg.winner) {
        case 'CITIZENS':
            winner = 'Победил город';
            break;
        case 'MAFIA':
            winner = 'Победила мафия';
            break;
    }

    this.view.history('Игра окончена. ' + winner);
};