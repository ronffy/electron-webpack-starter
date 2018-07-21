const { app, BrowserWindow } = require('electron');

// 通过 electron.app.on() 函数去监听生命周期事件

let win;

function createWindow() {
  // 创建浏览器窗口
  win = new BrowserWindow({
    width: 400,
    height: 600,
  })

  // 加载应用的index.html
  const indexPageURL = `file://${__dirname}/dist/index.html`;
  win.loadURL(indexPageURL);

  win.on('closed', () => {
    win = null;
  })

}

app.on('ready', createWindow);

function closeWindow() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

app.on('window-all-closed', closeWindow);

