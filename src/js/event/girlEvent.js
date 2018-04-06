var GirlEvent = function(game, bus, view) {
    this.game = game;
    this.bus = bus;
    this.view = view;
    this.event = 'girl';

    this.bus.addListener('girl.start', function(msg){ this.startAction(msg)}.bind(this));
    this.bus.addListener('girl.players', function(msg){ this.playersAction(msg)}.bind(this));
    this.bus.addListener('girl.end', function(msg){ this.endAction(msg)}.bind(this));
    this.bus.addListener('view.girl-players.choice', function(msg){
        this.view.active('game-history');
        this.bus.emit('sendmessage', {event: this.event, action: 'choice', data: parseInt(msg.player_id)});
    }.bind(this));
};

GirlEvent.prototype.startAction = function(msg) {
    console.info('GIRL.START', msg);
    this.view.history('Просыпается девушка');
    this.view.history('Девушка делает свой выбор...');
    audio.girlStart(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'start'});
    }.bind(this));
};

GirlEvent.prototype.playersAction = function(msg) {
    console.info('GIRL.PLAYERS', msg);
    var players = msg.data;
    this.view.girlPlayers(players);
    this.view.active('girl-players');

    if (testMode) {
        setTimeout(function () {
            var vote = players[getRandomInt(0, players.length - 1)];
            this.view.active('game-history');
            this.bus.emit('sendmessage', {event: this.event, action: 'choice', data: parseInt(vote.id)});
        }.bind(this), testTimeout);
    }
};

GirlEvent.prototype.endAction = function(msg) {
    console.info('GIRL.END', msg);
    this.view.history('Девушка сделала свой выбор. Девушка засыпает');
    audio.girlEnd(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'end'});
    }.bind(this), 1000);
};