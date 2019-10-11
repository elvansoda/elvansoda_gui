const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;
const noBtn = document.getElementById('no');
const yesBtn = document.getElementById('yes');

noBtn.addEventListener('click', () => {
  window.close();
});

yesBtn.addEventListener('click', () => {
  ipcRenderer.sendTo(1, 'data-update-request');
  window.close();
});
