var SheriffEvent = function(game, bus, view) {
    this.game = game;
    this.bus = bus;
    this.view = view;
    this.event = 'sheriff';

    this.bus.addListener('sheriff.start', function(msg){ this.startAction(msg)}.bind(this));
    this.bus.addListener('sheriff.players', function(msg){ this.playersAction(msg)}.bind(this));
    this.bus.addListener('sheriff.end', function(msg){ this.endAction(msg)}.bind(this));

    this.bus.addListener('view.sheriff-players.choice', function(msg){
        this.bus.emit('sendmessage', {event: this.event, action: 'choice', data: parseInt(msg.player_id)});
    }.bind(this));
};

SheriffEvent.prototype.startAction = function(msg) {
    console.info('SHERIFF.START', msg);
    this.view.history('Просыпается шериф');
    this.view.history('Шериф делает свой выбор...');
    audio.sheriffStart(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'start'});
    }.bind(this));
};

SheriffEvent.prototype.playersAction = function(msg) {
    console.info('SHERIFF.PLAYERS', msg);
    var players = msg.data;
    this.view.sheriffPlayers(players);
    this.view.active('sheriff-players');

    if (testMode) {
        setTimeout(function () {
            var vote = players[getRandomInt(0, players.length - 1)];
            this.view.active('game-history');
            this.bus.emit('sendmessage', {event: this.event, action: 'choice', data: parseInt(vote.id)});
        }.bind(this), testTimeout);
    }
};

SheriffEvent.prototype.endAction = function(msg) {
    console.info('SHERIFF.END', msg);
    this.view.history('Шериф сделал свой выбор. Шериф засыпает');
    audio.sheriffEnd(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'end'});
    }.bind(this), 1000);
};