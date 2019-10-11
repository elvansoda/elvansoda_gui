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
  sendDataToServer({});

  let columns = Array.from(document.getElementsByClassName('column'));

  columns.forEach((element) => {
    element.textContent = '';
  });
});

ipcRenderer.on('data-update-request', (event) => {
  let data = {};

  let rows = Array.from(document.getElementsByClassName('row'));

  console.log(json_data);

  rows.forEach((element, idx) => {
    if (data[idx]) {
      console.log(idx);
      element.childNodes[0].textContent = data[idx].ProductName;
      element.childNodes[1].textContent = data[idx].Amount;
      element.childNodes[2].textContent = data[idx].TotalPrice;
    } else return;
  });

  sendDataToServer(data);
});
