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
var electron_1 = __webpack_require__(/*! electron */ "electron");
// setup IPC Bridge
// global reference to mainWindow (necessary to prevent mainWindow from being garbage collected)
var mainWindow;
function createMainWindow() {
  mainWindow = new electron_1.BrowserWindow({
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
  mainWindow.on('ready-to-show', function () {
    return mainWindow.show();
  });
  // mainWindow.on('closed', () => {
  //   mainWindow = null;
  // });
}

electron_1.app.on('ready', createMainWindow);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Rvcm1FbGVjdHJvbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7QUNBYTs7QUFDYkEsOENBQTZDO0VBQUVHLEtBQUssRUFBRTtBQUFLLENBQUMsRUFBQztBQUM3RCxJQUFNQyxVQUFVLEdBQUdDLG1CQUFPLENBQUMsMEJBQVUsQ0FBQztBQUN0QztBQUNBO0FBQ0EsSUFBSUMsVUFBVTtBQUNkLFNBQVNDLGdCQUFnQixHQUFHO0VBQ3hCRCxVQUFVLEdBQUcsSUFBSUYsVUFBVSxDQUFDSSxhQUFhLENBQUM7SUFDdENDLEtBQUssRUFBRSxJQUFJO0lBQ1hDLE1BQU0sRUFBRSxHQUFHO0lBQ1hDLGNBQWMsRUFBRTtNQUNaO01BQ0FDLFdBQVcsRUFBRSxLQUFLO01BQ2xCQyxPQUFPLEVBQUU7SUFDYixDQUFDO0lBQ0RDLElBQUksRUFBRTtFQUNWLENBQUMsQ0FBQztFQUNGUixVQUFVLENBQUNTLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7RUFDN0NULFVBQVUsQ0FBQ1UsRUFBRSxDQUFDLGVBQWUsRUFBRTtJQUFBLE9BQU1WLFVBQVUsQ0FBQ1EsSUFBSSxFQUFFO0VBQUEsRUFBQztFQUN2RDtFQUNBO0VBQ0E7QUFDSjs7QUFDQVYsVUFBVSxDQUFDYSxHQUFHLENBQUNELEVBQUUsQ0FBQyxPQUFPLEVBQUVULGdCQUFnQixDQUFDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FXLE1BQU0sQ0FBQ2hCLE9BQU8sR0FBRyxDQUFDLENBQUM7Ozs7OztVQ2pEbkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2RvY2tlci1zdG9ybS9leHRlcm5hbCBub2RlLWNvbW1vbmpzIFwiZWxlY3Ryb25cIiIsIndlYnBhY2s6Ly9kb2NrZXItc3Rvcm0vLi9kaXN0L2NsaWVudC9lbGVjdHJvbi9pbmRleC5janMiLCJ3ZWJwYWNrOi8vZG9ja2VyLXN0b3JtL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RvY2tlci1zdG9ybS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2RvY2tlci1zdG9ybS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZG9ja2VyLXN0b3JtL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTsiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGVsZWN0cm9uXzEgPSByZXF1aXJlKFwiZWxlY3Ryb25cIik7XG4vLyBzZXR1cCBJUEMgQnJpZGdlXG4vLyBnbG9iYWwgcmVmZXJlbmNlIHRvIG1haW5XaW5kb3cgKG5lY2Vzc2FyeSB0byBwcmV2ZW50IG1haW5XaW5kb3cgZnJvbSBiZWluZyBnYXJiYWdlIGNvbGxlY3RlZClcbmxldCBtYWluV2luZG93O1xuZnVuY3Rpb24gY3JlYXRlTWFpbldpbmRvdygpIHtcbiAgICBtYWluV2luZG93ID0gbmV3IGVsZWN0cm9uXzEuQnJvd3NlcldpbmRvdyh7XG4gICAgICAgIHdpZHRoOiAxMzAwLFxuICAgICAgICBoZWlnaHQ6IDMwMCxcbiAgICAgICAgd2ViUHJlZmVyZW5jZXM6IHtcbiAgICAgICAgICAgIC8vIHByZWxvYWQ6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9lbGVjdHJvbi9wcmVsb2FkLmpzJyksXG4gICAgICAgICAgICB3ZWJTZWN1cml0eTogZmFsc2UsXG4gICAgICAgICAgICBzYW5kYm94OiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgfSk7XG4gICAgbWFpbldpbmRvdy5sb2FkVVJMKCdodHRwOi8vbG9jYWxob3N0OjgwODAnKTsgLy9jaGFuZ2UgdG8gbG9jYWxob3N0OjgwODBcbiAgICBtYWluV2luZG93Lm9uKCdyZWFkeS10by1zaG93JywgKCkgPT4gbWFpbldpbmRvdy5zaG93KCkpO1xuICAgIC8vIG1haW5XaW5kb3cub24oJ2Nsb3NlZCcsICgpID0+IHtcbiAgICAvLyAgIG1haW5XaW5kb3cgPSBudWxsO1xuICAgIC8vIH0pO1xufVxuZWxlY3Ryb25fMS5hcHAub24oJ3JlYWR5JywgY3JlYXRlTWFpbldpbmRvdyk7XG4vLyAvLyBNYWNPUyBTcGVjaWZpYyBmdW5jdGlvblxuLy8gZWxlY3Ryb24uYXBwLm9uKCd3aW5kb3ctYWxsLWNsb3NlZCcsIGZ1bmN0aW9uICgpIHtcbi8vICAgLy8gQ29tbW9uIGZvciBhcHBsaWNhdGlvbiBhbmQgdGhlaXIgbWVudSBiYXIgdG8gc3RheSBhY3RpdmUgdW50aWwgdXNlIHF1aXRzIGV4cGxpY2l0bHkgXG4vLyAgIGlmIChwcm9jZXNzLnBsYXRmb3JtICE9PSAnZGFyd2luJykge1xuLy8gICAgIGVsZWN0cm9uLmFwcC5xdWl0KClcbi8vICAgfVxuLy8gfSlcbi8vIC8vIE1hY09TIFNwZWNpZmljIGZ1bmN0aW9uXG4vLyBlbGVjdHJvbi5hcHAub24oJ2FjdGl2YXRlJywgZnVuY3Rpb24oKSB7XG4vLyAgIC8vIENvbW1vbiB0byByZS1jcmVhdGUgYSB3aW5kb3cgaW4gdGhlIGFwcCB3aGVuIHRoZSBkb2NrIGljb24gaXMgY2xpY2tlZCBhbmQgdGhlcmUgYXJlIG5vIG90aGVyIHdpbmRvd3Mgb3BlblxuLy8gICBpZiAoZWxlY3Ryb24uQnJvd3NlcldpbmRvdy5nZXRBbGxXaW5kb3dzKCkubGVuZ3RoID09PSAwKSBjcmVhdGVNYWluV2luZG93KClcbi8vIH0pXG4vLyBlbGVjdHJvbi5pcGNNYWluLmhhbmRsZSgndmVyaWZ5LW51bWJlcicsIGFzeW5jIChfOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xuLy8gICByZXR1cm4gYXdhaXQgdmVyaWZ5TW9iaWxlTnVtYmVyKGFyZ3MpO1xuLy8gfSk7XG4vLyBlbGVjdHJvbi5pcGNNYWluLmhhbmRsZSgndmVyaWZ5LWNvZGUnLCBhc3luYyAoXzogYW55LCBhcmdzOiBhbnkpID0+IHtcbi8vICAgcmV0dXJuIGF3YWl0IHZlcmlmeUNvZGUoYXJncyk7XG4vLyB9KTtcbi8vIGVsZWN0cm9uLmlwY01haW4uaGFuZGxlKCdwb3N0LWV2ZW50JywgYXN5bmMgKF86IGFueSwgYXJnczogYW55KSA9PiB7XG4vLyAgIGNvbnN0IHsgbW9iaWxlTnVtYmVyLCB0cmlnZ2VyaW5nRXZlbnQgfSA9IGFyZ3M7XG4vLyAgIHJldHVybiBhd2FpdCBwb3N0RXZlbnQobW9iaWxlTnVtYmVyLCB0cmlnZ2VyaW5nRXZlbnQpO1xuLy8gfSk7XG4vLyBlbGVjdHJvbi5pcGNNYWluLmhhbmRsZSgnZW1haWwtZXZlbnQnLCBhc3luYyAoXzogYW55LCBhcmdzOiBhbnkpID0+IHtcbi8vICAgcmV0dXJuIGF3YWl0IGVtYWlsRXZlbnQoYXJncyk7XG4vLyB9KTtcbm1vZHVsZS5leHBvcnRzID0ge307XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9kaXN0L2NsaWVudC9lbGVjdHJvbi9pbmRleC5janNcIik7XG4iLCIiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJlbGVjdHJvbl8xIiwicmVxdWlyZSIsIm1haW5XaW5kb3ciLCJjcmVhdGVNYWluV2luZG93IiwiQnJvd3NlcldpbmRvdyIsIndpZHRoIiwiaGVpZ2h0Iiwid2ViUHJlZmVyZW5jZXMiLCJ3ZWJTZWN1cml0eSIsInNhbmRib3giLCJzaG93IiwibG9hZFVSTCIsIm9uIiwiYXBwIiwibW9kdWxlIl0sInNvdXJjZVJvb3QiOiIifQ==