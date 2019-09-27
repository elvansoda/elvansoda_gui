const { app, BrowserWindow, ipcMain } = require("electron");

let win;

const data = require("./lib/common/data.json");

app.on("ready", () => {
  win = new BrowserWindow({
    kiosk: true,
    // autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL(`file://${__dirname}/public/html/index.html`);
  win.on("closed", () => {
    win = null;
  });
});

app.on("windows-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on("json-data-request", event => {
  event.reply("json-data-response", data);
});
