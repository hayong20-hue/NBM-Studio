const { app, BrowserWindow, shell, dialog } = require('electron');
const path = require('path');

app.disableHardwareAcceleration();

function createWindow() {
  const win = new BrowserWindow({
    width: 1580,
    height: 960,
    minWidth: 1180,
    minHeight: 720,
    show: false,
    title: 'NBM Studio Pro',
    backgroundColor: '#e9eff6',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  win.once('ready-to-show', () => win.show());
  win.webContents.on('did-fail-load', (_event, code, description, url) => {
    dialog.showErrorBox('NBM Studio Load Error', `${code} ${description}\n${url}`);
  });
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
  win.loadFile(path.join(__dirname, '../app/index.html'));
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
