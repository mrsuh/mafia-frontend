var MafiaGreetingEvent = function(game, bus, view) {
    this.game = game;
    this.bus = bus;
    this.view = view;
    this.event = 'mafia-greeting';

    this.bus.addListener('mafia-greeting.start', function(msg){ this.startAction(msg)}.bind(this));
    this.bus.addListener('mafia-greeting.players', function(msg){ this.playersAction(msg)}.bind(this));
    this.bus.addListener('mafia-greeting.end', function(msg){ this.endAction(msg)}.bind(this));
    this.bus.addListener('view.mafia-greeting-players.done', function(msg){
        this.view.active('game-history');
        this.bus.emit('sendmessage', {event: this.event, action: 'accept'});
    }.bind(this));
};

MafiaGreetingEvent.prototype.startAction = function(msg) {
    console.info('MAFIA-GREETING.START', msg);
    this.view.history('Просыпается мафия.');

    audio.mafiaStart(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'started'});
    }.bind(this));
};

MafiaGreetingEvent.prototype.playersAction = function(msg) {
    console.info('MAFIA-GREETING.PLAYERS', msg);
    this.view.history('Мафия знакомится...');

    if(this.game.role === 'ROLE_MAFIA') {
        this.view.mafiaGreetingPlayers(msg.players);
        this.view.active('mafia-greeting-players');
    }
};

MafiaGreetingEvent.prototype.endAction = function(msg) {
    console.info('MAFIA-GREETING.END', msg);
    this.view.history('Мафия засыпает');
    audio.mafiaEnd(function() {
        setTimeout(function() {
            this.bus.emit('sendmessage', {event: this.event, action: 'ended'});
        }.bind(this), 2000);
    }.bind(this));
};