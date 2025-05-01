const fs = require('fs').promises;
const path = require('path');
const imapDir = path.join(__dirname, 'imap_accounts');

// async function saveImapAccount() {
//     const accountName = document.getElementById('AccountName1').value;
//     const server = document.getElementById('ServerData1').value;
//     const email = document.getElementById('InputEmail1').value;
//     const password = document.getElementById('InputPassword1').value;

//     if (!accountName || !server || !email || !password) {
//         alert('Bitte alle Felder ausfüllen!');
//         return;
//     }

//     const data = { accountName, server, email, password };
//     await fs.mkdir(imapDir, { recursive: true });
//     await fs.writeFile(path.join(imapDir, `account_${Date.now()}.json`), JSON.stringify(data));
//     alert('IMAP-Konto gespeichert!');
// }


async function saveImapAccount() {
    const accountName = document.getElementById('AccountName1').value;
    const server = document.getElementById('ServerData1').value;
    const email = document.getElementById('InputEmail1').value;
    const password = document.getElementById('InputPassword1').value;

    const data = { accountName, server, email, password };
    // Erstelle den Ordner, falls er nicht existiert
    await fs.mkdir(imapDir, { recursive: true });
    // Schreibe die Datei
    await fs.writeFile(path.join(__dirname, 'imap_accounts', `account_${Date.now()}.json`), JSON.stringify(data));
    alert('IMAP-Konto gespeichert!');
}

async function loadImapAccounts() {
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = '';
    try {
        const files = await fs.readdir(imapDir);
        for (const file of files) {
            const data = JSON.parse(await fs.readFile(path.join(imapDir, file), 'utf8'));
            const li = document.createElement('li');
            li.textContent = `${data.accountName} (${data.email})`;
            noteList.appendChild(li);
        }
    } catch (err) {
        console.error(err);
    }
}

document.getElementById('imapForm').addEventListener('submit', (e) => {
    e.preventDefault();
    saveImapAccount();
});

// Beim Laden der Seite aufrufen
loadImapAccounts();