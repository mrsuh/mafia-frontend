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
    this.bus.addListener('game_over.over', function (msg) {
        this.overAction(msg)
    }.bind(this));

    this.bus.addListener('view.game-start.create', function(msg) {
        this.game.setUsername(msg.username);
        this.bus.emit('sendmessage', {event: this.event, action: 'create', data: {username: msg.username}});
    }.bind(this));

    this.bus.addListener('view.game-start.join', function(msg) {
        this.game.setId(msg.game_id);
        this.view.gameId(this.game.id);
        this.bus.emit('sendmessage', {
            event: this.event,
            action: 'join',
            data: {username: msg.username, game: parseInt(msg.game_id)}
        });
    }.bind(this));

    this.bus.addListener('view.game-players.start', function(msg) {
            this.bus.emit('sendmessage', {event: this.event, action: 'start'});
    }.bind(this));
};

GameEvent.prototype.createAction = function (msg) {
    console.info('GAME.CREATE', msg);
    var data = msg.data;

    this.game.setId(data['game']);
    this.game.setUserId(data['id']);
    this.game.setUsername(data['username']);
    this.game.setMaster(true);

    this.view.gameId(data['game']);
    this.view.showStartBtn();
};

GameEvent.prototype.joinAction = function (msg) {
    console.info('GAME.JOIN', msg);
    var data = msg.data;

    this.game.setUserId(data['id']);
    this.game.setUsername(data['username']);
};

GameEvent.prototype.endAction = function (msg) {
    this.view.history('Игра началась');
    audio.gameStart(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'end'});
    }.bind(this))
};

GameEvent.prototype.playersAction = function (msg) {
    var players = msg.data;

    console.info('GAME.PLAYERS', msg);
    this.view.active('game-players');
    for(var i = 0, length = players.length; i < length; i++) {
        var player_id = players[i].id;

        if(this.players[player_id]) {
            continue;
        }
        this.players[player_id] = players[i];
        var message = 'К игре присоединился игрок <b>' + players[i].username + '</b>';
        this.view.gamePlayers(message);
        this.view.history(message);
    }
};

GameEvent.prototype.overAction = function (msg) {
    console.info('GAME.OVER', msg);

    var winner = '';
    switch (msg.data) {
        case 'CITIZENS':
            winner = 'Победил город';
            break;
        case 'MAFIA':
            winner = 'Победила мафия';
            break;
    }

    this.view.history('Игра окончена. <b>' + winner + '</b>');
};