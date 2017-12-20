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
        this.bus.emit('sendmessage', {event: this.event, action: 'choice', player_id: msg.player_id});
    }.bind(this));
};

DoctorEvent.prototype.startAction = function(msg) {
    console.info('DOCTOR.START', msg);
    this.view.history('Просыпается доктор');
    audio.doctorStart(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'started'});
    }.bind(this));
};

DoctorEvent.prototype.playersAction = function(msg) {
    console.info('DOCTOR.PLAYERS', msg);
    this.view.history('Доктор делает свой выбор');

    if(this.game.role === 'ROLE_DOCTOR') {
        this.view.doctorPlayers(msg.players);
        this.view.active('doctor-players');
    }
};

DoctorEvent.prototype.endAction = function(msg) {
    console.info('DOCTOR.END', msg);
    this.view.history('Доктор сделал свой выбор. Доктор засыпает');
    audio.doctorEnd(function() {
        this.bus.emit('sendmessage', {event: this.event, action: 'ended'});
    }.bind(this));
};