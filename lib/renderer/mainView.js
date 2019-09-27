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

// socket.on("data updated", data => {
//   console.log("Data: ", data);
//   let td1 = document.getElementsByClassName("td_0");
//   let td2 = document.getElementsByClassName("td_1");
//   let td3 = document.getElementsByClassName("td_2");

//   if (data) {
//     for (var i = 0; i < data.length; i++) {
//       td1[i].textContent = data[i].ProductName;
//       td2[i].textContent = data[i].Amount;
//       td3[i].textContent = data[i].TotalPrice;
//     }
//   }
// });

// socket.on("data clear", () => {
//   console.log("data clear request");
//   let td1 = document.getElementsByClassName("td_0");
//   let td2 = document.getElementsByClassName("td_1");
//   let td3 = document.getElementsByClassName("td_2");

//   for (var i = 0; i < td1.length; i++) {
//     td1[i].textContent = "";
//     td2[i].textContent = "";
//     td3[i].textContent = "";
//   }
// });
