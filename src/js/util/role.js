var getRoleName = function(role) {
    var name = '';
    switch(role) {
        case 'ROLE_CITIZEN':
            name = 'Гражданин';
            break;
        case 'ROLE_MAFIA':
            name = 'Мафия';
            break;
        case 'ROLE_GIRL':
            name = 'Девушка';
            break;
        case 'ROLE_SHERIFF':
            name = 'Шериф';
            break;
        case 'ROLE_DOCTOR':
            name = 'Доктор';
            break;
    }

    return name;
};

var getRolePicturePath = function(role) {
    var pic = '/img/';
    switch(role) {
        case 'ROLE_CITIZEN':
            pic += 'panda.png';
            break;
        case 'ROLE_MAFIA':
            pic += 'koala.png';
            break;
        case 'ROLE_GIRL':
            pic += 'chloe.png';
            break;
        case 'ROLE_SHERIFF':
            pic += 'grizz.png';
            break;
        case 'ROLE_DOCTOR':
            pic += 'ice.png';
            break;
    }

    return pic;
};