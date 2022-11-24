const electron = require('electron');

// eslint-disable-next-line @typescript-eslint/no-var-requires

// setup IPC Bridge

// global reference to mainWindow (necessary to prevent mainWindow from being garbage collected)
let mainWindow;

function createMainWindow() {
  mainWindow = new electron.BrowserWindow({
    width: 1300,
    height: 300,
    webPreferences: {
      // preload: path.join(__dirname, '../electron/preload.js'),
      webSecurity: false,
      sandbox: false,
    },
    show: false,
  });
  

  mainWindow.loadURL('http://localhost:8082'); //change to localhost:8082
  mainWindow.on("ready-to-show", () => mainWindow.show());


  // mainWindow.on('closed', () => {
  //   mainWindow = null;
  // });
}


electron.app.on('ready', createMainWindow);
    
// // MacOS Specific function
// electron.app.on('window-all-closed', function () {
//   // Common for application and their menu bar to stay active until use quits explicitly 
//   if (process.platform !== 'darwin') {
//     electron.app.quit()
//   }
// })
// // MacOS Specific function
// electron.app.on('activate', function() {
//   // Common to re-create a window in the app when the dock icon is clicked and there are no other windows open
//   if (electron.BrowserWindow.getAllWindows().length === 0) createMainWindow()
// })
    


// electron.ipcMain.handle('verify-number', async (_: any, args: any) => {
//   return await verifyMobileNumber(args);
// });

// electron.ipcMain.handle('verify-code', async (_: any, args: any) => {
//   return await verifyCode(args);
// });

// electron.ipcMain.handle('post-event', async (_: any, args: any) => {
//   const { mobileNumber, triggeringEvent } = args;
//   return await postEvent(mobileNumber, triggeringEvent);
// });

// electron.ipcMain.handle('email-event', async (_: any, args: any) => {
//   return await emailEvent(args);
// });

export default mainWindow;