import { app, BrowserWindow } from 'electron';


let mainWindow: BrowserWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    webPreferences: {
      webSecurity: false,
      sandbox: false,
    },
    show: false,
  });
  

  mainWindow.loadURL('http://localhost:8080'); //change to localhost:8080
  mainWindow.on('ready-to-show', () => mainWindow.show());

}


app.on('ready', createMainWindow);
 
module.exports = {};