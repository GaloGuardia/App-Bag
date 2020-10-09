const {app, BrowserWindow} = require('electron')

function createWindow () {
    window = new BrowserWindow({width: 800, height: 600})
    window.loadFile('src/templates/index.html')

    var pyshell =  require('python-shell');
    pyshell.run('src/routes.py', function (err, results) {
        if (err) throw err;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});