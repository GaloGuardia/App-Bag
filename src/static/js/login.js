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

async function load() {
    document.getElementById("formLogin").addEventListener('submit', successLoginIn);

    if (await settings.has('username') && await settings.has('pass')) {
        let username = await settings.get('username');
        let pass = await settings.get('pass');
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

    await newDatabaseDAO.find({ username: username }).then(async(docs) => {
        if (docs.length == 0 || docs[0].pass != pass) return;

        let usernameRem = await settings.get('username');
        if (check && usernameRem != docs[0].username) {
            await settings.set('username', username);
            await settings.set('pass', pass);
        } else if (!check && usernameRem == docs[0].username) {
            await settings.unset();
        }

        global.username = username;
        this.submit();
    });
}