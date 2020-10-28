const { app, BrowserWindow } = require('electron');
// const debug = require("electron-debug");
// const Datastore = require("nedb");
const Datastore = require('nedb-promises');

function createWindow() {
    app.commandLine.appendSwitch("disable-http-cache");
    window = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        icon: 'src/static/images/logo.ico',
        autoHideMenuBar: true,
        webPreferences: { nodeIntegration: true }
    });

    loadDatabases();

    var pyshell = require('python-shell');
    pyshell.run('src/routes.py', function(err, results) {
        if (err) throw err;
    });

    // window.loadFile('src/templates/login.html');
    window.loadURL('http://127.0.0.1:5000/login');
    window.show();
}

let databases = {};

function loadDatabases() {
    let datastore = Datastore.create('./src/databases/users.db');
    datastore.load().then(() => {
        databases.users = datastore;
    }).catch((err) => {
        alert(err);
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

module.exports.databases = databases;