const TrayWindow = require('./js/index')

const { ipcMain, Tray, app, BrowserWindow } = require('electron')
const path = require('path')

app.commandLine.appendSwitch('disable-gpu')
app.commandLine.appendArgument('disable-gpu')

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
