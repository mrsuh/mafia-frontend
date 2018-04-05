var NightResultEvent = function (game, bus, view) {
    this.game = game;
    this.bus = bus;
    this.view = view;
    this.event = 'night_result';

    this.bus.addListener('night_result.out', function (msg) {
        this.outAction(msg)
    }.bind(this));
};

NightResultEvent.prototype.outAction = function (msg) {
    console.info('DAY.OUT', msg);
    this.view.history('Из игры выбывает <b>' + msg.data.username + '</b>');

    if (null !== this.out) {
        audio.courtOutOne(function () {
            this.bus.emit('sendmessage', {event: this.event, action: 'accept'});
        }.bind(this), 5000);
    } else {
        audio.courtOutNobody(function () {
            this.bus.emit('sendmessage', {event: this.event, action: 'accept'});
        }.bind(this), 2000);
    }
};