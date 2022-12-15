import { contextBridge } from 'electron';
import { ipcRenderer } from 'electron';
import child_process from 'child_process';


let runExec = (command:any, callback:any) => {
  return child_process.exec(command, callback);
};


// Access in the renderer/react as window.childProcess.exec
contextBridge.exposeInMainWorld('nodeMethod', {
  runExec: runExec,
  bool: true,
  rendInvoke: (input1:any, input2:any) => ipcRenderer.invoke(input1, input2)
});