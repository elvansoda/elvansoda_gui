const productTable = document.getElementById('product_table');
const tableDiv = document.getElementById('table_data');
const height = window.screen.availHeight;

const td_height = document.getElementsByTagName('th')[0].clientHeight;
const c = height / td_height;

tableDiv.style.overflow = 'auto';
tableDiv.style.height = `${height}px`;

for (var row_idx = 0; row_idx < c; row_idx++) {
  let tbody = document.createElement('tbody');
  tbody.className = `row`;
  productTable.appendChild(tbody);

  for (var column_idx = 0; column_idx < 3; column_idx++) {
    let td = document.createElement('td');
    td.className = 'column';
    tbody.appendChild(td);
  }
}

ipcRenderer.on('data-clear-request', (event) => {
  console.log('data clear requested');

  let columns = Array.from(document.getElementsByClassName('column'));

  columns.forEach((element) => {
    element.textContent = '';
  });
});

serial.on('data', (data) => {
  console.log(data);

  let data = {};
  let rows = Array.from(document.getElementsByClassName('row'));

  rows.forEach((element, idx) => {
    if (json_data[data]) {
      element.childNodes[0].textContent = json_data[data].productName;
      element.childNodes[1].textContent = element.childNodes[1].textContent
        ? 1
        : element.childNodes[1].textContent + 1;
      element.childNodes[2].textContent =
        element.childNodes[1].textContent * json_data[data].price;
    } else return;
  });
});
