const productTable = document.getElementById("product_table");
const tableDiv = document.getElementById("table_data");
const height = window.screen.availHeight;

const td_height = document.getElementsByTagName("th")[0].clientHeight;
const c = height / td_height;
console.log(`${height} ${td_height} ${c}`);

tableDiv.style.overflow = "auto";
tableDiv.style.height = `${height}px`;

for (var row_idx = 0; row_idx < c; row_idx++) {
  let tbody = document.createElement("tbody");
  tbody.className = `row${row_idx}`;
  productTable.appendChild(tbody);

  for (var column_idx = 0; column_idx < 3; column_idx++) {
    let td = document.createElement("td");
    td.className = `column${column_idx}`;
    tbody.appendChild(td);
  }
}
