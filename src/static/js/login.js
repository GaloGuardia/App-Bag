const settings = require('electron-settings');

let user = document.getElementById('username').value,
    pass = document.getElementById("pass").value,
    check = document.getElementById('ckb1').checked;

async function send() {
    if (check) {
        await settings.set('user', user);
        await settings.set('pass', pass);
    }
}