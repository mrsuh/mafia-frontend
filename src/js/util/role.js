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