const { BrowserWindow } = require('electron').remote;
const { ipcRenderer, remote } = require('electron');
const path = require('path');
const axios = require('axios').default;
const serialport = require('serialport');

const serial = new serialport(
  '/dev/ttyACM0',
  {
    baudRate: 9600,
  },
  (err) => {
    console.log(err);
  },
);

let jsonData;

const cancelWinBtn = document.getElementById('cancel');
const payWinBtn = document.getElementById('pay');

const popup_width = window.screen.width / 4;
const popup_height = window.screen.height / 2;

ipcRenderer.on('json-data-response', (event, data) => {
  jsonData = data;
});

ipcRenderer.send('json-data-request');

cancelWinBtn.addEventListener('click', (event) => {
  const modalPath = path.join('file://', __dirname, '../html/popup_clear.html');
  let win = new BrowserWindow({
    parent: remote.getCurrentWindow(),
    modal: true,
    width: popup_width,
    height: popup_height,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.on('close', () => {
    win = null;
  });
  win.loadURL(modalPath);
  win.show();
});

payWinBtn.addEventListener('click', (event) => {
  const modalPath = path.join('file://', __dirname, '/popup_pay.html');
  console.log(`${popup_width} ${popup_height}`);
  let win = new BrowserWindow({
    parent: remote.getCurrentWindow(),
    modal: true,
    width: popup_width,
    height: popup_height,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.on('close', () => {
    win = null;
  });
  win.loadURL(modalPath);
  win.show();
});

function sendDataToServer(data) {
  axios
    .put('https://localhost:3000/api/store/list', data)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
}

ipcRenderer.on('data-update-request', (event) => {
  let child = new BrowserWindow({
    parent: remote.getCurrentWindow(),
    modal: true,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  child.loadURL(`file://${__dirname}/waiting.html`);
  child.once('ready-to-show', () => {
    child.show();
  });
});

function checkJson(data) {
  let column = Array.from(document.getElementsByClassName('column0'));
  return column.findIndex((element) => {
    return element.innerHTML === jsonData[data].productName;
  });
}
