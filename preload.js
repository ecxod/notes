const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onSaveNote: (callback) => ipcRenderer.on('save-note', callback),
  //saveNote: (content) => ipcRenderer.invoke('save-note-content', content),
  saveNote: () => ipcRenderer.send('save-note'),
  loadNotes: () => ipcRenderer.invoke('load-notes'),
  initNotesDir: () => ipcRenderer.invoke('init-notes-dir')
});