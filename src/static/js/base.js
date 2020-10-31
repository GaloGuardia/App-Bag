const moment = require("moment");

if (document.readyState !== 'loading') {
    load();
} else {
    document.addEventListener('DOMContentLoaded', function() {
        load();
    });
}

function load() {
    setInterval(() => {
        let date = moment().format("DD/MM/YYYY HH:mm:ss");
        document.getElementById("date-app").innerHTML = date;
    }, 1);
}