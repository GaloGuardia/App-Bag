const settings = require('electron-settings');

async function send() {
    let user = document.getElementById('username').value,
        pass = document.getElementById("pass").value,
        check = document.getElementById('ckb1').checked;

    if (check) {
        await settings.set('user', user);
        await settings.set('pass', pass);
    }
}