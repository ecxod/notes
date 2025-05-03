// renderer.js
const fs = require('fs').promises;
const path = require('path');

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

// Verwende die preload.js-API für IPC
window.electronAPI.onSaveNote(() => {
  saveNote();
});

// Verarbeite die IPC-Nachricht für Theme-Wechsel
win.Electron.on('toggle-theme', (event, theme) => {
  document.documentElement.setAttribute('data-bs-theme', theme);
});

// Optional: Zeige ein About-Fenster
app.onShowAbout(() => {
  console.log("aaaa");
  alert('Minimal Notes App v1.0\nEntwickelt mit Electron');
});

init();