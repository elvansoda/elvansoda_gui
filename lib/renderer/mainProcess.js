const { BrowserWindow } = require('electron').remote;
const { ipcRenderer, remote } = require('electron');
const path = require('path');
const axios = require('axios').default;
const serialport = require('serialport');
const readLine = serialport.parsers.Readline;
const port = new serialport('/dev/ttyACM0', { baudRate: 9600 }, console.log);
const parser = new readLine({ delimiter: '\r\n' });
port.pipe(parser);

const jsonData = require('../../lib/common/data.json');

let productCode = [];
// ===========================================================
// function declaration
// ===========================================================

function getFingerprint() {
  console.log(`fp`);
  if (BrowserWindow.getFocusedWindow().webContents.id === 1) return;

  BrowserWindow.getFocusedWindow().close();
  createNewWindow('public/html/waiting.html');
}
function sendDataToServer(data) {
  console.log(data);
  axios
    .post('https://elvansoda.herokuapp.com/api/stocks/', data)
    .then(() => {
      clearTable();
    })
    .catch(() => console.log());
}

function checkJson(data) {
  console.log(data);
  if (!jsonData[data]) return -2;
  let column = Array.from(document.getElementsByClassName('column0'));
  return column.findIndex((element) => {
    return element.innerHTML === jsonData[data].productName;
  });
}

async function getRFIDCard(data) {
  console.log('card');
  if (BrowserWindow.getFocusedWindow().webContents.id === 1) return;

  BrowserWindow.getFocusedWindow().close();
  new Promise((resolve, reject) => {
    axios.get(`https://elvansoda.herokuapp.com/api/customer/id/'${data}'`).then(result => {
      if (result.data === 'invalid') reject('invalid_data');
      resolve(result);
    })
  }).then((result) => {
    console.log(result);
  }).then((result) => {
    console.log(result)
    const jsonData = getJSONDataOfPayment();
    sendDataToServer(jsonData);
  })
    .catch((err) => {
      console.log(err);
      createNewWindow('public/html/noUserFound.html');
      setTimeout(() => { BrowserWindow.getFocusedWindow().close(); }, 5000);
      return;
    });
}

function getJSONDataOfPayment() {
  let json = [];
  const productName = Array.from(document.getElementsByClassName('column0'))
    .filter(element => !!element.textContent)
    .map(element => {
      return element.textContent;
    });
  const amountList = Array.from(document.getElementsByClassName('column1')).filter(element => !!element.textContent).map(element => {
    return element.textContent;
  });

  console.log(productName);
  for (let i = 0; i < productName.length; i += 1) {
    json[i] = { "product_name": productName[i], "stock_number": amountList[i] };

  }
  console.log(json);
  return json;
}

async function checkUser(data) {
  return new Promise((resolve, reject) => {

  })

}
// ===========================================================
// ipcRenderer event
// ===========================================================

ipcRenderer.on('data-update-request', (event) => {
  const cacheData = jsonData;
  const cachedCode = productCode;

  const isCertRequired = cachedCode.some((element) => {
    console.log(cacheData[element].isCertRequired);
    return !!cacheData[element].isCertRequired;
  });
  console.log(isCertRequired);

  if (isCertRequired) {
    createNewWindow('public/html/cert_waiting.html');
  } else {
    createNewWindow('public/html/waiting.html');
  }
});

ipcRenderer.on('fingerprint-require', (event) => {
  console.log(1);
  port.write('a');
})

// ===========================================================
// serial event
// ===========================================================

parser.on('data', (data) => {
  if (!data) return;

  if (data.length < 8) {
    getFingerprint();
    return;
  } else if (data.length > 15) {
    getRFIDCard(data);
    return;
  }

  if (BrowserWindow.getFocusedWindow().webContents.id !== 1) return;
  const col_idx = checkJson(data);
  console.log(col_idx);
  if (col_idx === -2) return;
  else if (col_idx !== -1) {
    updateTableRow(col_idx, data);
  } else {
    createTableRow(data);
  }
  updateTotalCache();
  productCode.push(data);
});
