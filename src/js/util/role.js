const ROLE_CITIZEN = 1;
const ROLE_MAFIA = 2;
const ROLE_DOCTOR = 3;
const ROLE_GIRL = 4;
const ROLE_SHERIFF = 5;

var getRoleName = function(role) {
    var name = '';
    switch (parseInt(role)) {
        case ROLE_CITIZEN:
            name = 'Гражданин';
            break;
        case ROLE_MAFIA:
            name = 'Мафия';
            break;
        case ROLE_DOCTOR:
            name = 'Доктор';
            break;
        case ROLE_GIRL:
            name = 'Девушка';
            break;
        case ROLE_SHERIFF:
            name = 'Шериф';
            break;
    }

    return name;
};

var getRolePicturePath = function(role) {
    var pic = '/img/';
    switch (parseInt(role)) {
        case ROLE_CITIZEN:
            pic += 'panda.png';
            break;
        case ROLE_MAFIA:
            pic += 'koala.png';
            break;
        case ROLE_DOCTOR:
            pic += 'ice.png';
            break;
        case ROLE_GIRL:
            pic += 'chloe.png';
            break;
        case ROLE_SHERIFF:
            pic += 'grizz.png';
            break;
    }

    return pic;
};

var getRoleDescription = function (role) {
    var description = '';
    switch (parseInt(role)) {
        case ROLE_CITIZEN:
            description = 'Ваша задача вычислить всех отрицательных игроков и выгнать их';
            break;
        case ROLE_MAFIA:
            description = 'Ваша задача вычислить всех положительных игроков и выгнать их';
            break;
        case ROLE_DOCTOR:
            description = 'Вы можете лечить игроков. Если в эту ночь в игрока стреляли, но вы его лечили, то игрок остается жив';
            break;
        case ROLE_GIRL:
            description = 'Вы можете на одну ночь лишать игрока активности. Если в эту ночь в игрока стреляли, но вы к нему ходили, то игрок остается жив';
            break;
        case ROLE_SHERIFF:
            description = 'Вы можете выяснить роль игроков';
            break;
    }

    return description;
};
