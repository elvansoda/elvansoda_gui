const productTable = document.getElementById('product_table');
const tableDiv = document.getElementById('table_data');
const height = window.screen.availHeight;

const max_row = height / 28 - 2;

tableDiv.style.overflow = 'auto';
tableDiv.style.height = `${height}px`;

for (var row_idx = 0; row_idx < max_row; row_idx++) {
  let tbody = document.createElement('tbody');
  tbody.className = `row`;
  productTable.appendChild(tbody);

  let td = [];
  for (var column_idx = 0; column_idx < 3; column_idx++) {
    td.push(document.createElement('td'));
    td[column_idx].className = `column${column_idx}`;
    tbody.appendChild(td[column_idx]);
  }
}

document.getElementsByClassName('column0')[0].textContent = '사과';
ipcRenderer.on('data-clear-request', (event) => {
  console.log('data clear requested');

  let columns = Array.from(document.getElementsByClassName('column'));

  columns.forEach((element) => {
    element.textContent = '';
  });
});

serial.on('data', (data) => {
  console.log(data);

  let rows = Array.from(document.getElementsByClassName('row'));

  rows.forEach((element) => {
    if (jsonData[data]) {
      element.childNodes[0].textContent = jsonData[data].productName;
      element.childNodes[1].textContent = element.childNodes[1].textContent
        ? 1
        : element.childNodes[1].textContent + 1;
      element.childNodes[2].textContent =
        element.childNodes[1].textContent * jsonData[data].price;
    } else return;
  });
});

ipcRenderer.on('test', (event, data) => {
  const col_idx = checkJson(data);
  if (col_idx !== -1) {
    const col1 = document.getElementsByClassName('column1');
    col1[col_idx].textContent = Number(col1[col_idx].textContent) + 1;
    const col2 = document.getElementsByClassName('column2');
    col2[col_idx].textContent =
      Number(col2[col_idx].textContent) + jsonData[data].price;
  }
});

document.getElementById('test').addEventListener('click', () => {
  ipcRenderer.sendTo(1, 'test', '사과');
});
