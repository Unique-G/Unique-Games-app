const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const MenuItem = electron.MenuItem
const ipc = electron.ipcMain
const app = electron.app

const menu = new Menu()
menu.append(new MenuItem({ label: 'Help' }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'Configuración' }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'reportar un error' }))
menu.append(new MenuItem({ type: 'separator' }))

app.on('browser-window-created', function (event, win) {
  win.webContents.on('context-menu', function (e, params) {
    menu.popup(win, params.x, params.y)
  })
})

ipc.on('show-context-menu', function (event) {
  const win = BrowserWindow.fromWebContents(event.sender)
  menu.popup(win)
})
