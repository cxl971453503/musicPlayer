// electron 主进程文件
import { app, BrowserWindow, ipcMain } from 'electron'


app.whenReady().then(() => {
  const win = new BrowserWindow({
    frame: false, // 创建无边框窗口
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true, // 可以在渲染进程中使用node的api 为了安全默认为false
      contextIsolation: false, // 关闭渲染进程的沙箱
      webSecurity: false, // 关闭跨域检测
    }
  })
  win.webContents.openDevTools()
  if (process.argv[2]) {
    win.loadURL(process.argv[2]) // 开发环境
  } else {
    win.loadFile('index.html') // 生产环境
  }
  ipcMain.on('maximizeWindow', () => {
    if (!win.isMaximized()) {
      win.maximize()
    } else {
      win.unmaximize()
    }
  })
  ipcMain.on('minimizeWindow', () => {
    win.minimize()
  })
  ipcMain.on('closeWindow', () => {
    win.close()
  })
})