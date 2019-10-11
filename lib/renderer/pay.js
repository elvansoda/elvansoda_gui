const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;
const noBtn = document.getElementById('no');
const yesBtn = document.getElementById('yes');

noBtn.addEventListener('click', (event) => {
  window.close();
});

yesBtn.addEventListener('click', (event) => {
  ipcRenderer.sendTo(1, 'data-update-request');
  window.close();
});
