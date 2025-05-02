const fs = require('fs').promises;
const path = require('path');
const { ipcRenderer } = require('electron');
console.log('ipcRenderer geladen:', ipcRenderer);
console.log('Preload-Pfad:', path.join(__dirname, 'preload.js'));
const notesDir = path.join(__dirname, 'notes');

async function saveNote() {
  const content = document.getElementById('noteInput').value;
  if (!content) return;
  const filename = `note_${Date.now()}.txt`;
  await fs.writeFile(path.join(notesDir, filename), content);
  document.getElementById('noteInput').value = '';
  loadNotes();
}

async function loadNotes() {
  const noteList = document.getElementById('noteList');
  noteList.innerHTML = '';
  try {
    const files = await fs.readdir(notesDir);
    for (const file of files) {
      const content = await fs.readFile(path.join(notesDir, file), 'utf8');
      const li = document.createElement('li');
      li.textContent = content;
      noteList.appendChild(li);
    }
  } catch (err) {
    console.error(err);
  }
}

async function init() {
  try {
    await fs.mkdir(notesDir, { recursive: true });
    loadNotes();
  } catch (err) {
    console.error(err);
  }
}



// // Verarbeite die IPC-Nachricht vom Hauptprozess
// ipcRenderer.on('save-note', () => {
//   saveNote();
// });
window.electronAPI.onSaveNote(() => {
  saveNote();
});

// // Optional: Zeige ein About-Fenster
// ipcRenderer.on('show-about', () => {
//   alert('Minimal Notes App v1.0\nEntwickelt mit Electron');
// });

init();

// document.querySelector('form').addEventListener('submit', (e) => {
//   e.preventDefault(); // Verhindert das Standard-Formularverhalten
//   saveImapAccount();
// });

