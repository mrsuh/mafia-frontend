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