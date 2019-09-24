const { app, BrowserWindow } = require("electron");

let win;

app.on("ready", () => {
  win = new BrowserWindow({
    fullscreen: true,
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
