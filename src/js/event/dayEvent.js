var DayEvent = function(game, bus, view) {
    this.game = game;
    this.bus = bus;
    this.event = 'day';
    this.view = view;

    this.bus.addListener('day.start', function(msg){ this.startAction(msg)}.bind(this));
    this.bus.addListener('day.out', function(msg){ this.outAction(msg)}.bind(this));
};

DayEvent.prototype.startAction = function(msg) {
    console.info('DAY.START', msg);
    this.view.active('game-history');

    this.game.iteration = msg.iteration;

    if(this.game.iteration !== 1) {
        this.view.history('День начался. Город проснулся');
        audio.dayStart(function() {
            this.bus.emit('sendmessage', {event: this.event, action: 'started'});
        }.bind(this))
    } else {
        this.bus.emit('sendmessage', {event: this.event, action: 'started'});
    }
};

DayEvent.prototype.outAction = function(msg) {
    console.info('DAY.OUT', msg);
    this.view.history('Из игры выбывает <b>' + msg.player.username + '</b>');
};