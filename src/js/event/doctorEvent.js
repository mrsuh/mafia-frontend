var DoctorEvent = function(game, bus, view) {
    this.game = game;
    this.bus = bus;
    this.view = view;
    this.event = 'doctor';

    this.bus.addListener('doctor.start', function(msg){ this.startAction(msg)}.bind(this));
    this.bus.addListener('doctor.players', function(msg){ this.playersAction(msg)}.bind(this));
    this.bus.addListener('doctor.end', function(msg){ this.endAction(msg)}.bind(this));
    this.bus.addListener('view.doctor-players.choice', function(msg) {
        this.view.active('game-history');
        this.bus.emit('sendmessage', {event: this.event, action: 'choice', data: parseInt(msg.player_id)});
    }.bind(this));
};

DoctorEvent.prototype.startAction = function(msg) {
    console.info('DOCTOR.START', msg);
    this.view.history('Просыпается доктор');
    this.view.history('Доктор делает свой выбор...');
    audio.doctorStart(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'start'});
    }.bind(this));
};

DoctorEvent.prototype.playersAction = function(msg) {
    console.info('DOCTOR.PLAYERS', msg);

    var players = msg.data;

    this.view.doctorPlayers(players);
    this.view.active('doctor-players');

    if (testMode) {
        setTimeout(function () {
            var vote = players[getRandomInt(0, players.length - 1)];
            this.view.active('game-history');
            this.bus.emit('sendmessage', {event: this.event, action: 'choice', data: parseInt(vote.id)});
        }.bind(this), testTimeout);
    }
};

DoctorEvent.prototype.endAction = function(msg) {
    console.info('DOCTOR.END', msg);
    this.view.history('Доктор сделал свой выбор. Доктор засыпает');
    audio.doctorEnd(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'end'});
    }.bind(this), 1000);
};