'use strict';

const electron = require('electron');
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        width: 1440,
        height: 900,
        fullscreen: true,
        autoHideMenuBar: true
    });
    //mainWindow.webContents.openDevTools();
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.on('closed', function () {
        mainWindow = null;
    });

    globalShortcut.register('ctrl+x', function () {
        app.quit();
    })
    globalShortcut.register('ctrl+z', function () {
        mainWindow.hide();
    })
    globalShortcut.register('ctrl+c', function () {
        mainWindow.show();
    })
});
