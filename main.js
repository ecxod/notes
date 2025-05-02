const { app, BrowserWindow, Menu, ipcMain, globalShortcut } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js') // Pfad zum Preload-Skript
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
          accelerator: 'CmdOrCtrl+K',
          click() {
            win.loadFile('imapkonten.html');
          }
        },
        {
          label: 'Speichern',
          accelerator: 'CmdOrCtrl+S',
          click() {
            win.webContents.send('save-note');
          }
        },
        {
          label: 'Beenden',
          role: 'quit'
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
            win.webContents.send('show-about');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

ipcMain.on('note-saved', (event, message) => {
  console.log(message);
});

app.whenReady().then(() => {
  createWindow();
  globalShortcut.register('CommandOrControl+S', () => {
    BrowserWindow.getFocusedWindow()?.webContents.send('save-note');
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

