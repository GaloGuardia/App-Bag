const settings = require('electron-settings');
const path = require("path");
const DatabaseDAO = require(path.resolve("src/static/js/databaseDAO.js"));

if (document.readyState !== 'loading') {
    load();
} else {
    document.addEventListener('DOMContentLoaded', function() {
        load();
    });
}

function load() {
    document.getElementById("formLogin").addEventListener('submit', successLoginIn);

    if (settings.hasSync('username') && settings.hasSync('pass')) {
        let username = settings.getSync('username');
        let pass = settings.getSync('pass');
        document.getElementById("username").value = username;
        document.getElementById("pass").value = pass;
        document.getElementById("ckb1").checked = true;
    }
}

let newDatabaseDAO = new DatabaseDAO('users');

async function successLoginIn(evento) {
    evento.preventDefault();

    let username = document.getElementById('username').value,
        pass = document.getElementById("pass").value,
        check = document.getElementById('ckb1').checked;

    await newDatabaseDAO.find({ username: username }).then((docs) => {
        if (docs.length == 0 || docs[0].pass != pass) {
            $('.toast').toast('show');
            $('#toast-body').text("Las credenciales son incorrectas");
            setTimeout(() => {
                $('.toast').toast('hide');
            }, 4000);
            return;
        }

        let usernameRem = settings.getSync('username');
        if (check && usernameRem != docs[0].username) {
            settings.setSync('username', username);
            settings.setSync('pass', pass);
        } else if (!check && usernameRem == docs[0].username) {
            settings.unsetSync();
        }

        global.username = docs[0].username;
        this.submit();
    });
}