var SheriffResultEvent = function (game, bus, view) {
    this.game = game;
    this.bus = bus;
    this.view = view;
    this.event = 'sheriff_result';

    this.bus.addListener('sheriff_result.role', function (msg) {
        this.roleAction(msg)
    }.bind(this));

    this.bus.addListener('view.sheriff-players-result.done', function (msg) {
        this.view.active('game-history');
        this.bus.emit('sendmessage', {event: this.event, action: 'accept'});
    }.bind(this));
};

SheriffResultEvent.prototype.roleAction = function (msg) {
    console.info('SHERIFF.CHOICE', msg);

    this.view.sheriffResult(msg.data);
    this.view.active('sheriff-players-result');

    if (testMode) {
        setTimeout(function () {
            this.view.active('game-history');
            this.bus.emit('sendmessage', {event: this.event, action: 'accept'});
        }.bind(this), testTimeout);
    }
};
