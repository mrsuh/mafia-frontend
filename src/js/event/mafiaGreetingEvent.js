var MafiaGreetingEvent = function(game, bus, view) {
    this.game = game;
    this.bus = bus;
    this.view = view;
    this.event = 'greet_mafia';

    this.bus.addListener('greet_mafia.start', function (msg) {
        this.startAction(msg)
    }.bind(this));
    this.bus.addListener('greet_mafia.players', function (msg) {
        this.playersAction(msg)
    }.bind(this));
    this.bus.addListener('greet_mafia.end', function (msg) {
        this.endAction(msg)
    }.bind(this));

    this.bus.addListener('view.mafia-greeting-players.done', function(msg){
        this.view.active('game-history');
        this.bus.emit('sendmessage', {event: this.event, action: 'accept'});
    }.bind(this));
};

MafiaGreetingEvent.prototype.startAction = function(msg) {
    console.info('MAFIA-GREETING.START', msg);
    this.view.history('Просыпается мафия.');
    this.view.history('Мафия знакомится...');

    audio.mafiaStart(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'start'});
    }.bind(this));
};

MafiaGreetingEvent.prototype.playersAction = function(msg) {
    console.info('MAFIA-GREETING.PLAYERS', msg);

    this.view.mafiaGreetingPlayers(msg.data);
    this.view.active('mafia-greeting-players');

    if (testMode) {
        setTimeout(function () {
            this.view.active('game-history');
            this.bus.emit('sendmessage', {event: this.event, action: 'accept'});
        }.bind(this), testTimeout);
    }
};

MafiaGreetingEvent.prototype.endAction = function(msg) {
    console.info('MAFIA-GREETING.END', msg);
    this.view.history('Мафия засыпает');
    audio.mafiaEnd(function() {
        setTimeout(function() {
            this.bus.emit('sendmessage', {event: this.event, action: 'end'});
        }.bind(this), 2000);
    }.bind(this));
};