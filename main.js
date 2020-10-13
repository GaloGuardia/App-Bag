<<<<<<< HEAD
const { app, BrowserWindow } = require('electron');
=======
const {app, BrowserWindow} = require('electron');
>>>>>>> b9b34d77112c5fe71a53b70cf7f7e3b992040576

function createWindow() {
    window = new BrowserWindow({
        width: 800,
        height: 600,
        center: true,
        icon: 'src/static/images/logo.ico',
        autoHideMenuBar: true,
    });
    window.loadFile('src/templates/login.html');

    var pyshell = require('python-shell');
<<<<<<< HEAD
    pyshell.run('src/routes.py', function(err, results) {
=======
    pyshell.run('src/routes.py', function (err, results) {
>>>>>>> b9b34d77112c5fe71a53b70cf7f7e3b992040576
        if (err) throw err;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});