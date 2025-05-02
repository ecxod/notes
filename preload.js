const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onSaveNote: (callback) => ipcRenderer.on('save-note', callback)
});