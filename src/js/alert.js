'use strict';

var showAlert = function(message) {
    var alert = document.getElementById('js-alert');
    alert.addClass('active');

    var alertText = document.getElementById('js-alert-text');
    alertText.innerText = message;

    setTimeout(function() {
        alert.removeClass('active');
    }, 3000);
};
