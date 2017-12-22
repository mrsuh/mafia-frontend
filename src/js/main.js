'use strict';

var bus = new EventEmitter();

var gameObj = new Game();

var view = new View('app');
var audio = new Sound();

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

var ws = function () {
    console.info('ws connecting...');
    var conn = new WebSocket(config.wsserver);
    conn.onopen = function (e) {
        console.log("ws connected");
    };

    conn.onmessage = function (e) {
        bus.emit('onmessage', e.data);
    };

    conn.onclose = function(e) {
        console.info('ws close', e);
        setTimeout(ws, 3000);
    };

    conn.onerror = function(e) {
        console.info('ws error', e);
    };

    bus.removeListener('sendmessage');
    bus.addListener('sendmessage', function (msg) {

        if(!msg['game_id'] && gameObj.id) {
            msg['game_id'] = gameObj.id;
        }

        msg['gamer_id'] = gameObj.userId || '';

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

    if (msg['status'] === 'error') {
        console.error(msg);
        showAlert(msg['message']);
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

    var event = msg['event'];
    var action = msg['action'];

    bus.emit(event + '.' + action, msg);
});

setInterval(function(){
    bus.emit('sendmessage', {game_id: gameObj.id, event: 'pingpong', action: 'ping' })
},30000);
