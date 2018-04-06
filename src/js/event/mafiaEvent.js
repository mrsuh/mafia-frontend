var MafiaEvent = function(game, bus, view) {
    this.game = game;
    this.bus = bus;
    this.view = view;
    this.event = 'mafia';

    this.bus.addListener('mafia.start', function(msg){ this.startAction(msg)}.bind(this));
    this.bus.addListener('mafia.players', function(msg){ this.playersAction(msg)}.bind(this));
    this.bus.addListener('mafia.end', function(msg){ this.endAction(msg)}.bind(this));
    this.bus.addListener('view.mafia-players.vote', function(msg){
        this.view.active('game-history');
        this.bus.emit('sendmessage', {event: this.event, action: 'vote', data: parseInt(msg.player_id)});
    }.bind(this));
};

MafiaEvent.prototype.startAction = function(msg) {
    console.info('MAFIA.START', msg);
    this.view.history('Просыпается мафия');
    this.view.history('Мафия делает свой выбор...');
    audio.mafiaStart(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'start'});
    }.bind(this));
};

MafiaEvent.prototype.playersAction = function(msg) {
    console.info('MAFIA.PLAYERS', msg);
    var players = msg.data;

    this.view.mafiaPlayers(players);
    this.view.active('mafia-players');

    if (testMode) {
        setTimeout(function () {
            var vote = players[getRandomInt(0, players.length - 1)];
            this.view.active('game-history');
            this.bus.emit('sendmessage', {event: this.event, action: 'vote', data: parseInt(vote.id)});
        }.bind(this), testTimeout);
    }
};

MafiaEvent.prototype.endAction = function(msg) {
    console.info('MAFIA.END', msg);
    this.view.history('Мафия сделала свой выбор. Мафия засыпает');
    audio.mafiaEnd(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'end'});
    }.bind(this), 2000);
};