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
    this.view.courtResultClear();
    audio.courtStart(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'start'});
    }.bind(this));
};

CourtEvent.prototype.playersAction = function(msg) {
    console.info('COURT.PLAYERS', msg);
    var players = msg.data;

    var courtPlayers = [];
    var playerId = this.game.getUserId();
    for (var i = 0; i < players.length; i++) {
        var courtPlayer = players[i];
        if (parseInt(courtPlayer.id) === playerId) {
            continue
        }
        courtPlayers.push(courtPlayer);
    }

    this.view.courtPlayers(courtPlayers);
    this.view.active('court-players');

    if (testMode) {
        setTimeout(function () {
            var vote = players[getRandomInt(0, players.length - 1)];
            this.view.active('game-history');
            this.bus.emit('sendmessage', {event: this.event, action: 'vote', data: parseInt(vote.id)});
        }.bind(this), testTimeout);
    }
};

CourtEvent.prototype.voteAction = function (msg) {
    console.info('COURT.VOTE', msg);
    var message = 'Игрок <b>' + msg.data.player + '</b> проголосовал за <b>' + msg.data.vote + '</b>';
    this.view.courtResultVote(message);
    this.view.history(message);
};

CourtEvent.prototype.endAction = function(msg) {
    console.info('COURT.END', msg);
    this.view.history('Голосование окончено');

    audio.courtEnd(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'end'});
    }.bind(this));
};