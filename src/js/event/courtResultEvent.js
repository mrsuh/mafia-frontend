var CourtResultEvent = function (game, bus, view) {
    this.game = game;
    this.bus = bus;
    this.view = view;
    this.event = 'court_result';
    this.players = [];
    this.out = null;

    this.bus.addListener('court_result.out', function (msg) {
        this.outAction(msg)
    }.bind(this));

    this.bus.addListener('view.court-result.accept', function (msg) {
        this.view.active('game-history');
        this.bus.emit('sendmessage', {event: this.event, action: 'accept'});
    }.bind(this));
};

CourtResultEvent.prototype.outAction = function (msg) {
    console.info('COURT.OUT', msg);
    var player = msg.data;

    var out = '';
    if (player) {
        out = 'Из игры выбывает игрок <b>' + player.username + '</b>';
    } else {
        out = 'Из игры никто не выбывает';
    }

    this.view.history(out);
    this.view.courtResult(out);
    this.view.active('court-result');

    if (parameters.isTest()) {
        setTimeout(function () {
            this.view.active('game-history');
            this.bus.emit('sendmessage', {event: this.event, action: 'accept'});
        }.bind(this), parameters.getTestTimeout());
    }

    if (!player) {
        audio.courtOutNobody();
        return false;
    }

    if (player && parseInt(player.id) === parseInt(this.game.getUserId())) {
        audio.playerOut();
    }
};