const electron = require('electron');
const isGitInstalled = require('./js/helpers/InstallationHelpers').isGitInstalled;
const showElectronGitSetup = require('./js/helpers/InstallationHelpers').showElectronGitSetup;
const p = require('../package.json');

const ipcMain = electron.ipcMain;
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const dialog = electron.dialog;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

let mainWindow;
let helperWindow;
let splashScreen;

function createMainWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({icon: './images/TC_Icon.png', autoHideMenuBar: true, minWidth: 1200, minHeight: 650, center: true, useContentSize: true, show: false});

  if('developer_mode' in p && p.developer_mode) {
    mainWindow.webContents.openDevTools();
  }
  
  isGitInstalled().then(installed => {
    if(installed) {
      mainWindow.loadURL(`file://${__dirname}/index.html`);
    } else {
      console.warn('Git is not installed. Prompting user.');
      splashScreen.hide();
      return showElectronGitSetup(dialog).then(() => {
        app.quit();
      }).catch(() => {
        app.quit();
      });
    }
  });

  //Doesn't display until ready
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.maximize();
    splashScreen.close();
  });

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function createMainSplash() {
  splashScreen = new BrowserWindow({
    width: 600,
    height: 600,
    resizable: false,
    autoHideMenuBar: true,
    icon: './images/TC_Icon.png',
    frame: false,
    center: true,
    show: false
  });

  //splashScreen.webContents.openDevTools();

  splashScreen.loadURL(`file://${__dirname}/html/splash.html`);

  splashScreen.on('closed', function() {
    splashScreen = null;
  });
}

function createHelperWindow(url) {
  helperWindow = new BrowserWindow({
    width: 950,
    height: 660,
    minWidth: 950,
    minHeight: 580,
    useContentSize: true,
    center: true,
    autoHideMenuBar: true,
    show: true,
    frame: true
  });

  helperWindow.loadURL(url);

  helperWindow.on('closed', () => {
    helperWindow = null;
  });

  helperWindow.on('maximize', () => {
    helperWindow.webContents.send('maximize');
  });

  helperWindow.on('unmaximize', () => {
    helperWindow.webContents.send('unmaximize');
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  createMainSplash();
  setTimeout(function () {
    splashScreen.show();
    createMainWindow();
  }, 500);
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  // if (process.platform !== 'darwin') {
    app.quit();
  // }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createMainWindow();
  }
});

ipcMain.on('save-as', function (event, arg) {
  const input = dialog.showSaveDialog(mainWindow, arg.options);
  event.returnValue = input || false;
});

ipcMain.on('load-local', function (event, arg) {
  const input = dialog.showOpenDialog(mainWindow, arg.options);
  event.returnValue = input || false;
});

ipcMain.on('open-helper', (event, url = "http://git.door43.org/") => {
    if (helperWindow) {
        helperWindow.show();
        helperWindow.loadURL(url);
    } else {
        createHelperWindow(url);
    }
});
