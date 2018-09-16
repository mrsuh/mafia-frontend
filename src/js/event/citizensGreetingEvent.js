var CitizensGreetingEvent = function(game, bus, view) {
    this.game = game;
    this.bus = bus;
    this.view = view;
    this.event = 'citizens-greeting';

    this.bus.addListener('greet_citizen.start', function (msg) {
        this.startAction(msg)
    }.bind(this));
    this.bus.addListener('greet_citizen.role', function (msg) {
        this.roleAction(msg)
    }.bind(this));
    this.bus.addListener('greet_citizen.end', function (msg) {
        this.endAction(msg)
    }.bind(this));

    this.bus.addListener('view.citizens-greeting.accept', function(msg) {
        this.bus.emit('sendmessage', {event: this.event, action: 'accept'});
        this.view.active('game-history');
    }.bind(this));
};

CitizensGreetingEvent.prototype.startAction = function(msg) {
    console.info('CITIZENS-GREETING.START', msg);
    this.view.history('Город знакомится...');
    audio.citizensGreetingStart(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'start'});
    }.bind(this));
};

CitizensGreetingEvent.prototype.roleAction = function(msg) {
    console.info('CITIZENS-GREETING.ROLE', msg);

    var role = msg.data;

    this.view.role(role);
    this.view.active(this.event + '-role');

    if (parameters.isTest()) {
        this.view.showRole();
        setTimeout(function () {
            this.bus.emit('sendmessage', {event: this.event, action: 'accept'});
            this.view.active('game-history');
        }.bind(this), parameters.getTestTimeout());
    }
};

CitizensGreetingEvent.prototype.endAction = function(msg) {
    console.info('CITIZENS-GREETING.END', msg);
    this.view.history('Город познакомился');
    audio.citizensGreetingEnd(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'end'});
    }.bind(this));
};