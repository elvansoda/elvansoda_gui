const { ipcRenderer } = require('electron');
const { BrowserWindow } = require('electron').remote;

const noButton = document.getElementById('no');
const yesButton = document.getElementById('yes');

console.log(BrowserWindow.getFocusedWindow().webContents.id);
noButton.addEventListener('click', (event) => {
  window.close();
});

yesButton.addEventListener('click', (event) => {
  ipcRenderer.sendTo(1, 'data-clear-request');
  self.close();
});
