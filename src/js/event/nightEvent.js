var NightEvent = function(game, bus, view) {
    this.game = game;
    this.bus = bus;
    this.view = view;
    this.event = 'night';

    this.bus.addListener('night.start', function(msg){ this.startAction(msg)}.bind(this));
};

NightEvent.prototype.startAction = function(msg) {
    console.info('NIGHT.START', msg);
    this.view.history('Наступает ночь. Город засыпает');

    audio.nightStart(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'started'});
    }.bind(this));
};

NightEvent.prototype.acceptAction = function(msg) {

};

NightEvent.prototype.outAction = function() {

};