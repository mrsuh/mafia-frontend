var DayEvent = function(game, bus, view) {
    this.game = game;
    this.bus = bus;
    this.event = 'day';
    this.view = view;

    this.bus.addListener('day.start', function (msg) {
        this.startAction(msg)
    }.bind(this));
};

DayEvent.prototype.startAction = function(msg) {
    console.info('DAY.START', msg);
    this.view.active('game-history');

    this.game.iteration = msg.iteration;

    this.view.history('День начался. Город проснулся');
    audio.dayStart(function () {
        this.bus.emit('sendmessage', {event: this.event, action: 'start'});
    }.bind(this))
};