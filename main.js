const { app, BrowserWindow, Menu, ipcMain, globalShortcut } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.loadFile('index.html');

  // Definiere das Menü
  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Imap Konten',
          accelerator: 'CmdOrCtrl+K', // Tastenkürzel: Ctrl+S (Windows) oder Cmd+S (Mac)
          click() {
            // Sende eine Nachricht an den Renderer-Prozess
            win.loadFile('imapkonten.html');
          }
        },
        {
          label: 'Speichern',
          accelerator: 'CmdOrCtrl+S', // Tastenkürzel: Ctrl+S (Windows) oder Cmd+S (Mac)
          click() {
            // Sende eine Nachricht an den Renderer-Prozess
            win.webContents.send('save-note');
          }
        },
        {
          label: 'Beenden',
          role: 'quit' // Standardaktion zum Schließen der App
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        { role: 'close' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Über Notes App',
          click() {
            // Optional: Zeige ein About-Fenster
            win.webContents.send('show-about');
          }
        }
      ]
    }
  ];

  // Erstelle das Menü aus der Vorlage
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

// Verarbeite IPC-Nachrichten vom Renderer (optional, falls du Feedback brauchst)
ipcMain.on('note-saved', (event, message) => {
  console.log(message); // z. B. "Notiz gespeichert!"
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(() => {
  createWindow();
  globalShortcut.register('CommandOrControl+S', () => {
    BrowserWindow.getFocusedWindow()?.webContents.send('save-note');
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});