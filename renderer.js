const { ipcRenderer } = require('electron'); // If you're using Electron's renderer process

ipcRenderer.on('load-error', (event, errorDescription, errorCode) => {
  console.error(`File load failed: ${errorDescription} (Code: ${errorCode})`);
  // Display the error message to the user, perhaps in an alert box:
  alert(`Error loading file: ${errorDescription}`);
});
document.getElementById('generer').addEventListener('click', () => {
    
    const prompt = document.getElementById('prompt').value;

    fetch('http://localhost:5001/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('resultat').textContent = data.message;
        });
});

document.getElementById('make').addEventListener('click', () => {
    const prompt = document.getElementById('prompt').value;

    fetch('http://localhost:5001/make', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('resultat').textContent = data.message;
        });
});