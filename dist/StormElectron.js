/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ }),

/***/ "./dist/client/electron/index.cjs":
/*!****************************************!*\
  !*** ./dist/client/electron/index.cjs ***!
  \****************************************/
/***/ ((module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// eslint-disable-next-line @typescript-eslint/no-var-requires
const electron = __webpack_require__(/*! electron */ "electron");
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
      sandbox: false
    },
    show: false
  });
  mainWindow.loadURL('http://localhost:8080'); //change to localhost:8080
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
module.exports = {};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/client/electron/index.cjs");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Rvcm1FbGVjdHJvbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7QUNBYTs7QUFDYkEsOENBQTZDO0VBQUVHLEtBQUssRUFBRTtBQUFLLENBQUMsRUFBQztBQUM3RDtBQUNBLE1BQU1DLFFBQVEsR0FBR0MsbUJBQU8sQ0FBQywwQkFBVSxDQUFDO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLElBQUlDLFVBQVU7QUFDZCxTQUFTQyxnQkFBZ0IsR0FBRztFQUN4QkQsVUFBVSxHQUFHLElBQUlGLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDO0lBQ3BDQyxLQUFLLEVBQUUsSUFBSTtJQUNYQyxNQUFNLEVBQUUsR0FBRztJQUNYQyxjQUFjLEVBQUU7TUFDWjtNQUNBQyxXQUFXLEVBQUUsS0FBSztNQUNsQkMsT0FBTyxFQUFFO0lBQ2IsQ0FBQztJQUNEQyxJQUFJLEVBQUU7RUFDVixDQUFDLENBQUM7RUFDRlIsVUFBVSxDQUFDUyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO0VBQzdDVCxVQUFVLENBQUNVLEVBQUUsQ0FBQyxlQUFlLEVBQUUsTUFBTVYsVUFBVSxDQUFDUSxJQUFJLEVBQUUsQ0FBQztFQUN2RDtFQUNBO0VBQ0E7QUFDSjs7QUFDQVYsUUFBUSxDQUFDYSxHQUFHLENBQUNELEVBQUUsQ0FBQyxPQUFPLEVBQUVULGdCQUFnQixDQUFDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FXLE1BQU0sQ0FBQ2hCLE9BQU8sR0FBRyxDQUFDLENBQUM7Ozs7OztVQ25EbkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2RvY2tlci1zdG9ybS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly9kb2NrZXItc3Rvcm0vLi9kaXN0L2NsaWVudC9lbGVjdHJvbi9pbmRleC5janMiLCJ3ZWJwYWNrOi8vZG9ja2VyLXN0b3JtL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RvY2tlci1zdG9ybS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2RvY2tlci1zdG9ybS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZG9ja2VyLXN0b3JtL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTsiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG5jb25zdCBlbGVjdHJvbiA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTtcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG4vLyBzZXR1cCBJUEMgQnJpZGdlXG4vLyBnbG9iYWwgcmVmZXJlbmNlIHRvIG1haW5XaW5kb3cgKG5lY2Vzc2FyeSB0byBwcmV2ZW50IG1haW5XaW5kb3cgZnJvbSBiZWluZyBnYXJiYWdlIGNvbGxlY3RlZClcbmxldCBtYWluV2luZG93O1xuZnVuY3Rpb24gY3JlYXRlTWFpbldpbmRvdygpIHtcbiAgICBtYWluV2luZG93ID0gbmV3IGVsZWN0cm9uLkJyb3dzZXJXaW5kb3coe1xuICAgICAgICB3aWR0aDogMTMwMCxcbiAgICAgICAgaGVpZ2h0OiAzMDAsXG4gICAgICAgIHdlYlByZWZlcmVuY2VzOiB7XG4gICAgICAgICAgICAvLyBwcmVsb2FkOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vZWxlY3Ryb24vcHJlbG9hZC5qcycpLFxuICAgICAgICAgICAgd2ViU2VjdXJpdHk6IGZhbHNlLFxuICAgICAgICAgICAgc2FuZGJveDogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHNob3c6IGZhbHNlLFxuICAgIH0pO1xuICAgIG1haW5XaW5kb3cubG9hZFVSTCgnaHR0cDovL2xvY2FsaG9zdDo4MDgwJyk7IC8vY2hhbmdlIHRvIGxvY2FsaG9zdDo4MDgwXG4gICAgbWFpbldpbmRvdy5vbihcInJlYWR5LXRvLXNob3dcIiwgKCkgPT4gbWFpbldpbmRvdy5zaG93KCkpO1xuICAgIC8vIG1haW5XaW5kb3cub24oJ2Nsb3NlZCcsICgpID0+IHtcbiAgICAvLyAgIG1haW5XaW5kb3cgPSBudWxsO1xuICAgIC8vIH0pO1xufVxuZWxlY3Ryb24uYXBwLm9uKCdyZWFkeScsIGNyZWF0ZU1haW5XaW5kb3cpO1xuLy8gLy8gTWFjT1MgU3BlY2lmaWMgZnVuY3Rpb25cbi8vIGVsZWN0cm9uLmFwcC5vbignd2luZG93LWFsbC1jbG9zZWQnLCBmdW5jdGlvbiAoKSB7XG4vLyAgIC8vIENvbW1vbiBmb3IgYXBwbGljYXRpb24gYW5kIHRoZWlyIG1lbnUgYmFyIHRvIHN0YXkgYWN0aXZlIHVudGlsIHVzZSBxdWl0cyBleHBsaWNpdGx5IFxuLy8gICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSAhPT0gJ2RhcndpbicpIHtcbi8vICAgICBlbGVjdHJvbi5hcHAucXVpdCgpXG4vLyAgIH1cbi8vIH0pXG4vLyAvLyBNYWNPUyBTcGVjaWZpYyBmdW5jdGlvblxuLy8gZWxlY3Ryb24uYXBwLm9uKCdhY3RpdmF0ZScsIGZ1bmN0aW9uKCkge1xuLy8gICAvLyBDb21tb24gdG8gcmUtY3JlYXRlIGEgd2luZG93IGluIHRoZSBhcHAgd2hlbiB0aGUgZG9jayBpY29uIGlzIGNsaWNrZWQgYW5kIHRoZXJlIGFyZSBubyBvdGhlciB3aW5kb3dzIG9wZW5cbi8vICAgaWYgKGVsZWN0cm9uLkJyb3dzZXJXaW5kb3cuZ2V0QWxsV2luZG93cygpLmxlbmd0aCA9PT0gMCkgY3JlYXRlTWFpbldpbmRvdygpXG4vLyB9KVxuLy8gZWxlY3Ryb24uaXBjTWFpbi5oYW5kbGUoJ3ZlcmlmeS1udW1iZXInLCBhc3luYyAoXzogYW55LCBhcmdzOiBhbnkpID0+IHtcbi8vICAgcmV0dXJuIGF3YWl0IHZlcmlmeU1vYmlsZU51bWJlcihhcmdzKTtcbi8vIH0pO1xuLy8gZWxlY3Ryb24uaXBjTWFpbi5oYW5kbGUoJ3ZlcmlmeS1jb2RlJywgYXN5bmMgKF86IGFueSwgYXJnczogYW55KSA9PiB7XG4vLyAgIHJldHVybiBhd2FpdCB2ZXJpZnlDb2RlKGFyZ3MpO1xuLy8gfSk7XG4vLyBlbGVjdHJvbi5pcGNNYWluLmhhbmRsZSgncG9zdC1ldmVudCcsIGFzeW5jIChfOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xuLy8gICBjb25zdCB7IG1vYmlsZU51bWJlciwgdHJpZ2dlcmluZ0V2ZW50IH0gPSBhcmdzO1xuLy8gICByZXR1cm4gYXdhaXQgcG9zdEV2ZW50KG1vYmlsZU51bWJlciwgdHJpZ2dlcmluZ0V2ZW50KTtcbi8vIH0pO1xuLy8gZWxlY3Ryb24uaXBjTWFpbi5oYW5kbGUoJ2VtYWlsLWV2ZW50JywgYXN5bmMgKF86IGFueSwgYXJnczogYW55KSA9PiB7XG4vLyAgIHJldHVybiBhd2FpdCBlbWFpbEV2ZW50KGFyZ3MpO1xuLy8gfSk7XG5tb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vZGlzdC9jbGllbnQvZWxlY3Ryb24vaW5kZXguY2pzXCIpO1xuIiwiIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiZWxlY3Ryb24iLCJyZXF1aXJlIiwibWFpbldpbmRvdyIsImNyZWF0ZU1haW5XaW5kb3ciLCJCcm93c2VyV2luZG93Iiwid2lkdGgiLCJoZWlnaHQiLCJ3ZWJQcmVmZXJlbmNlcyIsIndlYlNlY3VyaXR5Iiwic2FuZGJveCIsInNob3ciLCJsb2FkVVJMIiwib24iLCJhcHAiLCJtb2R1bGUiXSwic291cmNlUm9vdCI6IiJ9