const { ipcRenderer } = require('electron');

ipcRenderer.sendTo(1, 'fingerprint-require');
