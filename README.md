# MAFIA frontend

Party game modelling a conflict between an informed minority, the mafia, and an uninformed majority, the innocents

![Screen](/screen.png)

## Installation
```bash
sh bin/build.sh
```

## Docker

#### Build
```
docker build -p mafia-frontend .
```

#### Run
```
docker run mafia-frontend
```

#### Run from Hub
```
docker run mrsuh/mafia-frontend
```

## Config
app/config.js
````js
var config = {
    wsserver: 'ws://server.com:8000'
};
````

## URL Parameters
* master - is master of game
* sound - enable sound
* test - test/bot mode
* testUsersCount
* testAutoStart - auto start testing
* testTimeout - timeout(seconds) between bot actions
* gameId
* username
* storageUrl - store game data to URL or LocalStorage


## Examples

#### Run tests/autoplay
```
http://127.0.0.1:9000?master=1&sound=0&test=1&testUsersCount=5&testTimeout=3
```

#### Run game as master
```
http://127.0.0.1:9000?master=1
```

#### Join to game
```
http://127.0.0.1:9000?master=1
```


## Messages
````text
1< game.create > game.create
1< game.join > game.join > game.players
1< game.start
````

````text
1> day.start < day.started // sound: игра началась
````
````text
1> citizens-greeting.start < citizens-greeting.started // sound: город знакомиться
1> citizens-greeting.role < citizens-greeting.accept
1> citizens-greeting.end < citizens-greeting.ended // sound: город закончил знакомиться
````
````text
1> night.start < night.started // sound: наступает ночь. город засыпает
````
````text
1> mafia-greeting.start < mafia-greeting.started // sound: просыпается мафия
1> mafia-greeting.players < mafia-greeting.accept // sound: мафия знакомится
1> mafia-greeting.end < mafia-greeting.ended // sound: мафия засыпает
````
````text
2> day.start < day.started  // sound: наступает день. город просыпается
````
````text
2> court.start < court.started  // sound: начинается голосование
2> court.players < court.vote // sound: голосование закончилось
2> court.out
2> court.end < court.ended // sound: выбывает игрок\никто не выбывает
````
````text
2> night.start < night.started // sound: наступает ночь. город засыпает
````
````text
2> mafia.start < mafia.started // sound: просыпается мафия
2> mafia.players < mafia.vote
2> mafia.end < mafia.ended // sound: мафия сделала свой выбор. мафия засыпает
````
````text
2> doctor.start < doctor.started // sound: просыпается доктор
2> doctor.players < doctor.choice
2> doctor.end < doctor.ended // sound: доктор сделал свой выбор. доктор засыпает
````
````text
2> girl.start < girl.started // sound: просыпается девушка
2> girl.players < girl.choice
2> girl.end < girl.ended // sound: девушка сделала свой выбор. девушка засыпает
````
````text
2> sherif.start < sherif.started // sound: просыпается шериф
2> sherif.players < sherif.choice > sherif.choice
2> sherif.end < sherif.ended // sound: шериф сделал свой выбор. шериф засыпает
````
````text
3> day.start < day.started // sound: город просыпается
3> day.out
3> day.end < day.ended // sound: выбывает игрок\никто не выбывает
````