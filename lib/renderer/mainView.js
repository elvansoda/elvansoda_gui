const productTable = document.getElementById('product_table');
const tableDiv = document.getElementById('table_data');
const max_row = window.screen.availHeight / 28 - 1;

const cancelWinBtn = document.getElementById('cancel');
const payWinBtn = document.getElementById('pay');

const width = window.screen.width / 6;
const height = window.screen.height / 2;

// console.log(`width:${width}, height:${height}`);
// ===========================================================
// function declaration
// ===========================================================

function createTable() {
  let frag = document.createDocumentFragment();

  for (var row_idx = 0; row_idx < max_row; row_idx++) {
    let tbody = document.createElement('tbody');
    tbody.className = 'row';
    let innerfrag = document.createDocumentFragment();

    for (var col_idx = 0; col_idx < 3; col_idx++) {
      let td = document.createElement('td');
      td.className = `column${col_idx}`;
      innerfrag.appendChild(td.cloneNode(true));
    }
    tbody.appendChild(innerfrag);
    frag.appendChild(tbody);
  }
  productTable.appendChild(frag.cloneNode(true));

  return productTable;
}

function updateTableRow(idx, data) {
  const col1 = document.getElementsByClassName('column1');
  col1[idx].textContent = Number(col1[idx].textContent) + 1;
  const col2 = document.getElementsByClassName('column2');
  col2[idx].textContent = Number(col2[idx].textContent) + jsonData[data].price;
}

function createTableRow(data) {
  const row = document.getElementsByClassName('row');
  const empty_idx = Array.from(
    document.getElementsByClassName('column0'),
  ).findIndex((element) => {
    return element.innerHTML === '';
  });

  const emptyCol = Array.from(row)[empty_idx].childNodes;

  emptyCol[0].textContent = jsonData[data].productName;
  emptyCol[1].textContent = 1;
  emptyCol[2].textContent = jsonData[data].price;
}

function createNewWindow(path) {
  let win = new BrowserWindow({
    parent: remote.getCurrentWindow(),
    modal: true,
    width,
    height,
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  child.loadURL(path);
  child.once('ready-to-show', () => {
    child.show();
  });
}
// ===========================================================
// main process
// ===========================================================

createTable();
createTableRow(' 10 0A 65 DA ');
console.log(jsonData[' 10 0A 65 DA ']);
// ===========================================================
// ipcRenderer event
// ===========================================================

ipcRenderer.on('data-clear-request', (event) => {
  let columns = Array.from(document.getElementsByTagName('td'));
  columns.forEach((element) => {
    element.textContent = '';
  });
});

ipcRenderer.on('data-update-request', (event) => {
  let child = new BrowserWindow({
    parent: remote.getCurrentWindow(),
    modal: true,
    width,
    height,
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

// ===========================================================
// button logic
// ===========================================================

cancelWinBtn.addEventListener('click', (event) => {
  const modalPath = path.join('file://', __dirname, 'popup_clear.html');
  let win = new BrowserWindow({
    parent: remote.getCurrentWindow(),
    modal: true,
    width,
    height,
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
  let win = new BrowserWindow({
    parent: remote.getCurrentWindow(),
    modal: true,
    width,
    height,
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
