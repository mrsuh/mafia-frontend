var CourtEvent = function(game, bus, view) {
    this.game = game;
    this.bus = bus;
    this.view = view;
    this.event = 'court';
    this.players = [];
    this.out = null;

    this.bus.addListener('court.start', function(msg){ this.startAction(msg)}.bind(this));
    this.bus.addListener('court.players', function(msg){ this.playersAction(msg)}.bind(this));
    this.bus.addListener('court.vote', function(msg){ this.voteAction(msg)}.bind(this));
    this.bus.addListener('court.end', function(msg){ this.endAction(msg)}.bind(this));
    this.bus.addListener('view.court-players.vote', function(msg){
        this.view.active('game-history');
        this.bus.emit('sendmessage', {event: this.event, action: 'vote', data: parseInt(msg.player_id)});
    }.bind(this));
};

CourtEvent.prototype.startAction = function(msg) {
    console.info('COURT.START', msg);
    this.view.history('Начинается голосование');
    audio.courtStart(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'start'});
    }.bind(this));
};

CourtEvent.prototype.playersAction = function(msg) {
    console.info('COURT.PLAYERS', msg);
    var players = msg.data;
    this.view.courtPlayers(players);
    this.view.active('court-players');

    if (testMode) {
        setTimeout(function () {
            this.view.active('game-history');
            this.bus.emit('sendmessage', {event: this.event, action: 'vote', data: parseInt(players[0].id)});
        }.bind(this), testTimeout);
    }
};

CourtEvent.prototype.voteAction = function (msg) {//todo
    console.info('COURT.VOTE', msg);
    this.view.history('Игрок <b>' + msg.data.username + '</b> проголосовал за <b>' + msg.vote.username + '</b>');
};

CourtEvent.prototype.endAction = function(msg) {
    console.info('COURT.END', msg);
    this.view.history('Голосование окончено');

    audio.courtEnd(function() {

        if(null !== this.out) {
            audio.courtOutOne(function() {
                this.bus.emit('sendmessage', {event: this.event, action: 'end'});
            }.bind(this), 5000);
        } else {
            audio.courtOutNobody(function() {
                this.bus.emit('sendmessage', {event: this.event, action: 'end'});
            }.bind(this), 2000);
        }

    }.bind(this));
};