import { remote } from 'electron';
import path from 'path';

const a = 4;
class C {
  a = 3;
  f() {
    console.log('index');
  }
}

document.getElementById('root').innerHTML = `<button style="color: red">go login</button>`;
document.getElementById('root').onclick = () => {
  const loginPath = path.join('file://', remote.app.getAppPath(), 'dist/login.html');
  let win = new remote.BrowserWindow({
    width: 300,
    height: 500,
  })
  win.on('close', function () {
    // 窗口被关闭时清空资源
    win = null
  })
  // 加载网页
  win.loadURL(loginPath)
  // 显示窗口
  win.show()
}
