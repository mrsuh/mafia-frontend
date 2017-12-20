'use strict';

var bus = new EventEmitter();

var gameObj = new Game();

var ws = function () {
    var conn = new WebSocket('ws://127.0.0.1:8080');
    conn.onopen = function (e) {
        console.log("Connection established!");
    };

    conn.onmessage = function (e) {
        bus.emit('onmessage', e.data);
    };

    bus.addListener('sendmessage', function (msg) {

        if(!msg['game_id'] && gameObj.id) {
            msg['game_id'] = gameObj.id;
        }

        console.info('send msg ', msg);
        conn.send(JSON.stringify(msg));
    })
};

bus.addListener('onmessage', function (e) {
    var msg = JSON.parse(e);

    console.info('rcv msg ', msg);

    if (typeof msg['status'] === 'undefined') {
        console.error('msg has not field "status"');

        return false;
    }

    if (typeof msg['event'] === 'undefined') {
        console.error('msg has not field "event"');

        return false;
    }

    if (typeof msg['action'] === 'undefined') {
        console.error('msg has not field "action"');

        return false;
    }

    if (msg['status'] === 'error') {
        console.error(msg);

        return false;
    }

    var event = msg['event'];
    var action = msg['action'];

    bus.emit(event + '.' + action, msg);
});

var view = new View('app');

var audio = new Audio();

new GameEvent(gameObj, bus, view);
new CitizensGreetingEvent(gameObj, bus, view);
new DayEvent(gameObj, bus, view);
new NightEvent(gameObj, bus, view);
new MafiaGreetingEvent(gameObj, bus, view);
new CourtEvent(gameObj, bus, view);
new MafiaEvent(gameObj, bus, view);
new DoctorEvent(gameObj, bus, view);
new SheriffEvent(gameObj, bus, view);
new GirlEvent(gameObj, bus, view);

ws();