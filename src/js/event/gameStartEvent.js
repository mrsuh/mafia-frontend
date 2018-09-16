var GameStartEvent = function (game, bus, view) {
    this.game = game;
    this.bus = bus;
    this.event = 'game_start';
    this.view = view;

    this.bus.addListener('game_start.start', function (msg) {
        this.startAction(msg)
    }.bind(this));
};

GameStartEvent.prototype.startAction = function (msg) {
    console.info('GAME_START.START', msg);
    this.view.active('game-history');

    this.game.iteration = msg.iteration;

    this.view.history('Игра началась');
    audio.gameStart(function () {
        this.bus.emit('sendmessage', {event: this.event, action: 'start'});
    }.bind(this))
};