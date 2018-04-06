'use strict';

var params = getJsonFromUrl();

var bus = new EventEmitter();

var gameObj = new Game(parseInt(params['storage']) === 0);

var view = new View('app');
var audio = new Sound();
audio.setEnable(params['sound'] !== 'off');

var testMode = !!params['test'];
var testTimeout = params['testTimeout'] ? params['testTimeout'] : 500;

new GameEvent(gameObj, bus, view);
new CitizensGreetingEvent(gameObj, bus, view);
new DayEvent(gameObj, bus, view);
new NightEvent(gameObj, bus, view);
new NightResultEvent(gameObj, bus, view);
new MafiaGreetingEvent(gameObj, bus, view);
new CourtEvent(gameObj, bus, view);
new CourtResultEvent(gameObj, bus, view);
new MafiaEvent(gameObj, bus, view);
new DoctorEvent(gameObj, bus, view);
new SheriffEvent(gameObj, bus, view);
new SheriffResultEvent(gameObj, bus, view);
new GirlEvent(gameObj, bus, view);

var ws = function () {
    console.info('ws connecting...');
    var conn = new WebSocket(config.wsserver);
    conn.onopen = function (e) {
        console.log("ws connected");
        reconnect();
    };

    conn.onmessage = function (e) {
        onMessage(e.data);
    };

    conn.onclose = function (e) {
        console.info('ws close', e);
        setTimeout(ws, 3000);
    };

    conn.onerror = function (e) {
        console.info('ws error', e);
    };

    bus.removeListener('sendmessage');
    bus.addListener('sendmessage', function (msg) {
        console.info('send msg ', msg);
        conn.send(JSON.stringify(msg));
    })
};

var reconnect = function () {
    var gameId = gameObj.getId();
    var playerId = gameObj.getUserId();

    if (gameId && playerId) {
        bus.emit('sendmessage', {
            event: 'game',
            action: 'reconnect',
            data: {game: parseInt(gameId), player: parseInt(playerId)}
        });

        view.showGameIdAndUsername()
    }
};

var Errors = {
    'invalid player id': 'Неверный ID пользователя',
    'player have wrong role for this action': 'У вас недостаточно прав для выполнения этого действия',
    'you can not do this action with this player several times in a row': 'Вы не можете выполнять это действие несоклько раз подряд',
    'username already exists': 'Пользователь с таким именем уже существует',
    'you have not rights to start game': 'У вас нет прав, чтобы начать игру',
    'too few players to start game': 'Слишком мало игрогов, чтобы начать игру. Минимальное количество игроков: 3'
};

var onMessage = function (data) {
    console.info('rcv msg', data);

    var msg = JSON.parse(data);

    console.info('rcv msg parsed ', msg);

    if (typeof msg['status'] === 'undefined') {
        console.error('msg has not field "status"');

        return false;
    }

    if (msg['status'] === 'err') {
        console.error(msg);
        var data = msg['data'];
        var err = Errors[data];
        if (err) {
            showAlert(err);
        } else {
            showAlert(data);
        }

        if (msg['action'] === 'reconnect') {
            gameObj.setUserId(null);
            gameObj.setId(null);
        }

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

    bus.emit(msg['event'] + '.' + msg['action'], msg);
};

window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    var msg = '<code>' + 'Error: ' + errorMsg + '<br>Script: ' + url + '<br>Line: ' + lineNumber
        + '<br>Column: ' + column + '<br>StackTrace: ' + errorObj + '</code>';

    view.history(msg);
};
