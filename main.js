const TrayWindow = require('./js/index')

const { ipcMain, Tray, app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')

// ========

// app.commandLine.appendSwitch('disable-gpu')
// app.commandLine.appendArgument('disable-gpu')

app.on('ready', () => {
  var timeout = 10
  if (process.platform === 'linux') {
    console.log(process.platform)
    timeout = 200
  }
  setTimeout(function () {
    TrayWindow.setOptions({
      trayIconPath: path.join('assets/binanceIcon.png'),
      windowUrl: `file://${path.join(__dirname, 'views/index.html')}`,
      width: 340,
      height: 380
    })
  }, timeout)
})

// ======

// let tray = null
// app.whenReady().then(() => {
//   tray = new Tray('/assets/binanceIcon.png')
//   const contextMenu = Menu.buildFromTemplate([
//     { label: 'Item1', type: 'radio' },
//     { label: 'Item2', type: 'radio' },
//     { label: 'Item3', type: 'radio', checked: true },
//     { label: 'Item4', type: 'radio' }
//   ])
//   tray.setToolTip('This is my application.')
//   tray.setContextMenu(contextMenu)
// })
