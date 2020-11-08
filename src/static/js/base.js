const moment = require("moment");
const settings = require('electron-settings');

if (document.readyState !== 'loading') {
    load();
} else {
    document.addEventListener('DOMContentLoaded', function() {
        load();
    });
}

function load() {
    setInterval(() => {
        let date = moment().format("DD/MM/YYYY");
        let time = moment().format("HH:mm:ss");
        document.getElementById("date-app").innerHTML = date;
        document.getElementById("time-app").innerHTML = time;
    }, 1);
}