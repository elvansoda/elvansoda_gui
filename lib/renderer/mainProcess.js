const { BrowserWindow } = require("electron").remote;
const path = require("path");

const serialport = require("serialport");

const serial = new serialport("/dev/ttyACM0", {
  baudRate: 9600
});

const cancelWinBtn = document.getElementById("cancel");
const payWinBtn = document.getElementById("pay");

const popup_width = window.screen.width / 2 - 250;
const popup_height = window.screen.height / 2 - 110;

cancelWinBtn.addEventListener("click", event => {
  const modalPath = path.join("file://", __dirname, "../html/popup_clear.html");
  console.log(1);
  //  if (win.isVisible) return;

  let win = new BrowserWindow({
    width: popup_width,
    height: popup_height,
    frame: false
  });

  win.on("close", () => {
    win = null;
  });
  win.loadURL(modalPath);
  win.show();
});

payWinBtn.addEventListener("click", event => {
  const modalPath = path.join("file://", __dirname, "../html/popup_pay.html");
  let win = new BrowserWindow({
    width: popup_width,
    height: popup_height,
    frame: false
  });

  win.on("close", () => {
    win = null;
  });
  win.loadURL(modalPath);
  win.show();
});

serial.on("data", data => {
  console.log(data);
});
/*
socket.on("data updated", data => {
  console.log("Data: ", data);
  let td1 = document.getElementsByClassName("td_0");
  let td2 = document.getElementsByClassName("td_1");
  let td3 = document.getElementsByClassName("td_2");

  if (data) {
    for (var i = 0; i < data.length; i++) {
      td1[i].textContent = data[i].ProductName;
      td2[i].textContent = data[i].Amount;
      td3[i].textContent = data[i].TotalPrice;
    }
  }
});

socket.on("data clear", () => {
  console.log("data clear request");
  let td1 = document.getElementsByClassName("td_0");
  let td2 = document.getElementsByClassName("td_1");
  let td3 = document.getElementsByClassName("td_2");

  for (var i = 0; i < td1.length; i++) {
    td1[i].textContent = "";
    td2[i].textContent = "";
    td3[i].textContent = "";
  }
});
*/
