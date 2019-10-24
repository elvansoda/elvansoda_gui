const { app, BrowserWindow, ipcMain } = require('electron');

let win;

app.on('ready', () => {
  win = new BrowserWindow({
    kiosk: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // win.webContents.openDevTools();
  win.loadURL(`file://${__dirname}/public/html/index.html`);
  win.on('closed', () => {
    win = null;
  });
});

app.on('windows-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

ipcMain.on('close_tab', (event, data) => {
  event.sender.send('close_tab_b', data);
})
