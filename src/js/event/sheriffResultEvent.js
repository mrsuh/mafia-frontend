var SheriffEvent = function (game, bus, view) {
    this.game = game;
    this.bus = bus;
    this.view = view;
    this.event = 'sheriff_result';

    // this.bus.addListener('sheriff.start', function(msg){ this.startAction(msg)}.bind(this));
    // this.bus.addListener('sheriff.players', function(msg){ this.playersAction(msg)}.bind(this));
    // this.bus.addListener('sheriff.end', function(msg){ this.endAction(msg)}.bind(this));
    // this.bus.addListener('sheriff.choice', function(msg){ this.choiceAction(msg)}.bind(this));
    //
    //
    // this.bus.addListener('view.sheriff-players.choice', function(msg){
    //         this.bus.emit('sendmessage', {event: this.event, action: 'choice', player_id: msg.player_id});
    // }.bind(this));
    //
    // this.bus.addListener('view.sheriff-players-result.done', function(msg){
    //     this.view.active('game-history');
    //     this.bus.emit('sendmessage', {event: this.event, action: 'choice-done'});
    // }.bind(this));
};

SheriffEvent.prototype.startAction = function (msg) {
    console.info('SHERIFF.START', msg);
    this.view.history('Просыпается шериф');
    audio.sheriffStart(function () {
        this.bus.emit('sendmessage', {event: this.event, action: 'start'});
    }.bind(this));
};

SheriffEvent.prototype.playersAction = function (msg) {
    console.info('SHERIFF.PLAYERS', msg);
    this.view.history('Шериф делает свой выбор...');

    if (this.game.role === ROLE_SHERIFF) {
        this.view.sheriffPlayers(msg.data);
        this.view.active('sheriff-players');
    }
};

SheriffEvent.prototype.choiceAction = function (msg) {
    console.info('SHERIFF.CHOICE', msg);

    if (this.game.role === ROLE_SHERIFF) {
        this.view.sheriffResult(msg.data);
        this.view.active('sheriff-players-result');
    }
};

SheriffEvent.prototype.endAction = function (msg) {
    console.info('SHERIFF.END', msg);
    this.view.history('Шериф сделал свой выбор. Шериф засыпает');
    audio.sheriffEnd(function () {
        this.bus.emit('sendmessage', {event: this.event, action: 'end'});
    }.bind(this), 1000);
};