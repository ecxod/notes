const fs = require('fs').promises;
const path = require('path');
const imapDir = path.join(__dirname, 'imap_accounts');

async function saveImapAccount() {
    const accountName = document.getElementById('AccountName1').value;
    const server = document.getElementById('ServerData1').value;
    const email = document.getElementById('InputEmail1').value;
    const password = document.getElementById('InputPassword1').value;

    if (!accountName || !server || !email || !password) {
        alert('Bitte alle Felder ausfüllen!');
        return;
    }

    const data = { accountName, server, email, password };
    await fs.mkdir(imapDir, { recursive: true });
    await fs.writeFile(path.join(imapDir, `account_${Date.now()}.json`), JSON.stringify(data));
    alert('IMAP-Konto gespeichert!');
}

document.getElementById('imapForm').addEventListener('submit', (e) => {
    e.preventDefault();
    saveImapAccount();
});