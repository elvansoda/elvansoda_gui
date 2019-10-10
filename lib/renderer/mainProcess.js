const { BrowserWindow, net } = require('electron').remote;
const { ipcRenderer } = require('electron');
const path = require('path');
const axios = require('axios').default;

// const serialport = require("serialport");
// const serial = new serialport("/dev/ttyACM0", {
//   baudRate: 9600
// });

let json_data;

const cancelWinBtn = document.getElementById('cancel');
const payWinBtn = document.getElementById('pay');

const popup_width = window.screen.width / 4;
const popup_height = window.screen.height / 2;

ipcRenderer.on('json-data-response', (event, data) => {
  json_data = data;
  console.log(json_data);
});

console.log(BrowserWindow.getFocusedWindow().webContents.id);

ipcRenderer.send('json-data-request');

cancelWinBtn.addEventListener('click', (event) => {
  const modalPath = path.join('file://', __dirname, '../html/popup_clear.html');
  let win = new BrowserWindow({
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
  const modalPath = path.join('file://', __dirname, '../html/popup_pay.html');
  console.log(`${popup_width} ${popup_height}`);
  let win = new BrowserWindow({
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
// serial.on("data", data => {
//   console.log(data);
//   const request = net.require("https://elvansoda.herokuapp.com/manager/update");
//   request.on("response", res => {
//     console.log(`STATUS: ${response.statusCode}`);
//   });
// });
