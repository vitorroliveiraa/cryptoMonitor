// Sets variables (const)
const electron = require('electron')
const { app, BrowserWindow, ipcMain, Tray, screen } = electron
const path = require('path')

const assetsDirectory = path.join(__dirname, 'assets')

let tray = undefined
let window = undefined

// Don't show the app in the doc
// app.dock.hide()

// Creates tray & window
app.on('ready', () => {
  createTray()
  createWindow()
})

// Quit the app when the window is closed
app.on('window-all-closed', () => {
  app.quit()
})

// Creates tray image & toggles window on click
const createTray = () => {
  tray = new Tray(path.join(assetsDirectory, 'binanceIcon.png'))
  tray.on('click', function (event, position) {
    toggleWindow()
  })
}

const getWindowPosition = () => {
  const windowBounds = window.getBounds()
  console.log('windowBounds=>', windowBounds)
  const trayBounds = tray.getBounds()
  console.log('trayBounds=>', trayBounds)

  let screenElectron = electron.screen
  let mainScreen = screenElectron.getPrimaryDisplay()
  let dimensions = mainScreen.size
  console.log('dimensions=>', dimensions)

  // Center window horizontally below the tray icon
  const x = Math.round(
    trayBounds.width / 2 + dimensions.width - windowBounds.width * 1.74
  )
  console.log('x=>', x)

  // Position window 4 pixels vertically below the tray icon
  const y = Math.round(
    trayBounds.height + 3 + dimensions.height - windowBounds.height * 2.5
  )
  console.log('y=>', y)
  console.log('==================')

  return { x: x, y: y }
}

// Creates window & specifies its values
const createWindow = () => {
  window = new BrowserWindow({
    width: 340,
    height: 380,
    show: false, //aparece assim que o app é iniciado
    frame: false, //barra de ferramentas nativa no SO
    fullscreenable: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true
    }
  })
  // This is where the index.html file is loaded into the window
  window.loadURL('file://' + __dirname + '/views/index.html')

  // Hide the window when it loses focus
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide()
    }
  })
}

const toggleWindow = () => {
  if (window.isVisible()) return window.hide()
  return showWindow()
}

const showWindow = () => {
  const position = getWindowPosition()
  window.setPosition(position.x, position.y, false)
  window.show()
  window.focus()
}

ipcMain.on('show-window', () => {
  showWindow()
})
