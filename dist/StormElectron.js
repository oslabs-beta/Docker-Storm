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
const electron_1 = __webpack_require__(/*! electron */ "electron");
// setup IPC Bridge
// global reference to mainWindow (necessary to prevent mainWindow from being garbage collected)
var mainWindow;
function createMainWindow() {
  mainWindow = new electron_1_1.BrowserWindow({
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
  mainWindow.on('ready-to-show', () => mainWindow.show());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Rvcm1FbGVjdHJvbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7QUNBYTs7QUFDYkEsOENBQTZDO0VBQUVHLEtBQUssRUFBRTtBQUFLLENBQUMsRUFBQztBQUM3RCxNQUFNQyxVQUFVLEdBQUdDLG1CQUFPLENBQUMsMEJBQVUsQ0FBQztBQUN0QztBQUNBO0FBQ0EsSUFBSUMsVUFBVTtBQUNkLFNBQVNDLGdCQUFnQixHQUFHO0VBQ3hCRCxVQUFVLEdBQUcsSUFBSUYsVUFBVSxDQUFDSSxhQUFhLENBQUM7SUFDdENDLEtBQUssRUFBRSxJQUFJO0lBQ1hDLE1BQU0sRUFBRSxHQUFHO0lBQ1hDLGNBQWMsRUFBRTtNQUNaO01BQ0FDLFdBQVcsRUFBRSxLQUFLO01BQ2xCQyxPQUFPLEVBQUU7SUFDYixDQUFDO0lBQ0RDLElBQUksRUFBRTtFQUNWLENBQUMsQ0FBQztFQUNGUixVQUFVLENBQUNTLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7RUFDN0NULFVBQVUsQ0FBQ1UsRUFBRSxDQUFDLGVBQWUsRUFBRSxNQUFNVixVQUFVLENBQUNRLElBQUksRUFBRSxDQUFDO0VBQ3ZEO0VBQ0E7RUFDQTtBQUNKOztBQUNBVixVQUFVLENBQUNhLEdBQUcsQ0FBQ0QsRUFBRSxDQUFDLE9BQU8sRUFBRVQsZ0JBQWdCLENBQUM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQVcsTUFBTSxDQUFDaEIsT0FBTyxHQUFHLENBQUMsQ0FBQzs7Ozs7O1VDakRuQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZG9ja2VyLXN0b3JtL2V4dGVybmFsIG5vZGUtY29tbW9uanMgXCJlbGVjdHJvblwiIiwid2VicGFjazovL2RvY2tlci1zdG9ybS8uL2Rpc3QvY2xpZW50L2VsZWN0cm9uL2luZGV4LmNqcyIsIndlYnBhY2s6Ly9kb2NrZXItc3Rvcm0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZG9ja2VyLXN0b3JtL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vZG9ja2VyLXN0b3JtL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9kb2NrZXItc3Rvcm0vd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImVsZWN0cm9uXCIpOyIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZWxlY3Ryb25fMSA9IHJlcXVpcmUoXCJlbGVjdHJvblwiKTtcbi8vIHNldHVwIElQQyBCcmlkZ2Vcbi8vIGdsb2JhbCByZWZlcmVuY2UgdG8gbWFpbldpbmRvdyAobmVjZXNzYXJ5IHRvIHByZXZlbnQgbWFpbldpbmRvdyBmcm9tIGJlaW5nIGdhcmJhZ2UgY29sbGVjdGVkKVxubGV0IG1haW5XaW5kb3c7XG5mdW5jdGlvbiBjcmVhdGVNYWluV2luZG93KCkge1xuICAgIG1haW5XaW5kb3cgPSBuZXcgZWxlY3Ryb25fMS5Ccm93c2VyV2luZG93KHtcbiAgICAgICAgd2lkdGg6IDEzMDAsXG4gICAgICAgIGhlaWdodDogMzAwLFxuICAgICAgICB3ZWJQcmVmZXJlbmNlczoge1xuICAgICAgICAgICAgLy8gcHJlbG9hZDogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL2VsZWN0cm9uL3ByZWxvYWQuanMnKSxcbiAgICAgICAgICAgIHdlYlNlY3VyaXR5OiBmYWxzZSxcbiAgICAgICAgICAgIHNhbmRib3g6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBzaG93OiBmYWxzZSxcbiAgICB9KTtcbiAgICBtYWluV2luZG93LmxvYWRVUkwoJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MCcpOyAvL2NoYW5nZSB0byBsb2NhbGhvc3Q6ODA4MFxuICAgIG1haW5XaW5kb3cub24oJ3JlYWR5LXRvLXNob3cnLCAoKSA9PiBtYWluV2luZG93LnNob3coKSk7XG4gICAgLy8gbWFpbldpbmRvdy5vbignY2xvc2VkJywgKCkgPT4ge1xuICAgIC8vICAgbWFpbldpbmRvdyA9IG51bGw7XG4gICAgLy8gfSk7XG59XG5lbGVjdHJvbl8xLmFwcC5vbigncmVhZHknLCBjcmVhdGVNYWluV2luZG93KTtcbi8vIC8vIE1hY09TIFNwZWNpZmljIGZ1bmN0aW9uXG4vLyBlbGVjdHJvbi5hcHAub24oJ3dpbmRvdy1hbGwtY2xvc2VkJywgZnVuY3Rpb24gKCkge1xuLy8gICAvLyBDb21tb24gZm9yIGFwcGxpY2F0aW9uIGFuZCB0aGVpciBtZW51IGJhciB0byBzdGF5IGFjdGl2ZSB1bnRpbCB1c2UgcXVpdHMgZXhwbGljaXRseSBcbi8vICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gIT09ICdkYXJ3aW4nKSB7XG4vLyAgICAgZWxlY3Ryb24uYXBwLnF1aXQoKVxuLy8gICB9XG4vLyB9KVxuLy8gLy8gTWFjT1MgU3BlY2lmaWMgZnVuY3Rpb25cbi8vIGVsZWN0cm9uLmFwcC5vbignYWN0aXZhdGUnLCBmdW5jdGlvbigpIHtcbi8vICAgLy8gQ29tbW9uIHRvIHJlLWNyZWF0ZSBhIHdpbmRvdyBpbiB0aGUgYXBwIHdoZW4gdGhlIGRvY2sgaWNvbiBpcyBjbGlja2VkIGFuZCB0aGVyZSBhcmUgbm8gb3RoZXIgd2luZG93cyBvcGVuXG4vLyAgIGlmIChlbGVjdHJvbi5Ccm93c2VyV2luZG93LmdldEFsbFdpbmRvd3MoKS5sZW5ndGggPT09IDApIGNyZWF0ZU1haW5XaW5kb3coKVxuLy8gfSlcbi8vIGVsZWN0cm9uLmlwY01haW4uaGFuZGxlKCd2ZXJpZnktbnVtYmVyJywgYXN5bmMgKF86IGFueSwgYXJnczogYW55KSA9PiB7XG4vLyAgIHJldHVybiBhd2FpdCB2ZXJpZnlNb2JpbGVOdW1iZXIoYXJncyk7XG4vLyB9KTtcbi8vIGVsZWN0cm9uLmlwY01haW4uaGFuZGxlKCd2ZXJpZnktY29kZScsIGFzeW5jIChfOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xuLy8gICByZXR1cm4gYXdhaXQgdmVyaWZ5Q29kZShhcmdzKTtcbi8vIH0pO1xuLy8gZWxlY3Ryb24uaXBjTWFpbi5oYW5kbGUoJ3Bvc3QtZXZlbnQnLCBhc3luYyAoXzogYW55LCBhcmdzOiBhbnkpID0+IHtcbi8vICAgY29uc3QgeyBtb2JpbGVOdW1iZXIsIHRyaWdnZXJpbmdFdmVudCB9ID0gYXJncztcbi8vICAgcmV0dXJuIGF3YWl0IHBvc3RFdmVudChtb2JpbGVOdW1iZXIsIHRyaWdnZXJpbmdFdmVudCk7XG4vLyB9KTtcbi8vIGVsZWN0cm9uLmlwY01haW4uaGFuZGxlKCdlbWFpbC1ldmVudCcsIGFzeW5jIChfOiBhbnksIGFyZ3M6IGFueSkgPT4ge1xuLy8gICByZXR1cm4gYXdhaXQgZW1haWxFdmVudChhcmdzKTtcbi8vIH0pO1xubW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL2Rpc3QvY2xpZW50L2VsZWN0cm9uL2luZGV4LmNqc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImVsZWN0cm9uXzEiLCJyZXF1aXJlIiwibWFpbldpbmRvdyIsImNyZWF0ZU1haW5XaW5kb3ciLCJCcm93c2VyV2luZG93Iiwid2lkdGgiLCJoZWlnaHQiLCJ3ZWJQcmVmZXJlbmNlcyIsIndlYlNlY3VyaXR5Iiwic2FuZGJveCIsInNob3ciLCJsb2FkVVJMIiwib24iLCJhcHAiLCJtb2R1bGUiXSwic291cmNlUm9vdCI6IiJ9