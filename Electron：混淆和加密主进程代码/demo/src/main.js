/*
 * @Author: SHEN
 * @Date: 2020-11-13 10:34:36
 * @Last Modified by: SHEN
 * @Last Modified time: 2020-11-13 10:37:53
 */
const { app, BrowserWindow, BrowserView, Menu, MenuItem, dialog, ipcMain } = require('electron')
const path = require('path')
const {sayHello} = require('./tool')

let menu = new Menu()
let browserWin = null

menu.append(new MenuItem({
  label: '自定义快捷键',
  submenu: [
    {
      label: '打开开发者工具',
      accelerator: 'CmdOrCtrl+D',
      click: () => {
        browserWin.webContents.openDevTools()
      }
    },
    {
      label: '重加载页面',
      accelerator: 'CmdOrCtrl+R',
      click: () => {
        browserWin.reload()
      }
    }
  ]
}))
Menu.setApplicationMenu(menu)

function createWindow () {
  const win = new BrowserWindow({
    title: sayHello(),
    width: 800,
    height: 600,
    backgroundColor: '#2e2c29',
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 并且为你的应用加载index.html
  win.loadFile(path.join(app.getAppPath(), './htmls/index.html'))

  browserWin = win
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

/**
 * 从主进程到渲染进程的异步通信
 */
ipcMain.on('message', (event, arg) => {
  if (arg.type === 'insert') {
    event.returnValue = 'insert'
  }
  else {
    event.returnValue = '未定义'
  }
})