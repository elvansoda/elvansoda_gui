const { BrowserWindow } = require('electron').remote;
const { ipcRenderer, remote } = require('electron');
const path = require('path');
const axios = require('axios').default;
const serialport = require('serialport');
const jsonData = require('../../lib/common/data.json');

const serial = new serialport(
  '/dev/ttyACM0',
  {
    baudRate: 9600,
  },
  console.log,
);

let productCode = [];
// ===========================================================
// function declaration
// ===========================================================

function sendDataToServer(data) {
  axios
    .put('https://localhost:3000/api/store/list', data)
    .then((result) => {
      console.log(result);
    })
    .catch(console.log);
}

function checkJson(data) {
  let column = Array.from(document.getElementsByClassName('column0'));
  return column.findIndex((element) => {
    return element.innerHTML === jsonData[data].productName;
  });
}

// ===========================================================
// ipcRenderer event
// ===========================================================

ipcRenderer.on('data-update-request', (event) => {
  const cacheData = jsonData;
  const pList = Array.from(document.getElementsByClassName('column0'));
  const nonEmptyList = pList.filter((element) => !!element.textContent);

  console.log(nonEmptyList);

  //if there is cert-required, then create window.

  if (isCertRequired) {
    createNewWindow(`file://${__dirname}/cert_waiting.html`);
  }
  // sendDataToServer({});
});

// ===========================================================
// serial event
// ===========================================================

serial.on('data', (data) => {
  const col_idx = checkJson(data);
  if (col_idx !== -1) {
    updateTableRow(col_idx, data);
  } else {
    createTableRow(data);
  }
  productCode.push(data);
});
