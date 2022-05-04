const path = require('path')
const { app, Menu, Tray, systemPreferences } = require('electron')

let tray = null

const getIcon = () => {
  if (process.platform === 'win32') return '/assets/binanceIcon.png'
  // if (systemPreferences.isDarkMode()) return 'icon-light.png'
  return '/assets/binanceIcon.png'
}

app.on('ready', () => {
  if (app.dock) app.dock.hide()

  tray = new Tray(path.join(__dirname, getIcon()))

  if (process.platform === 'win32') {
    tray.on('click', tray.popUpContextMenu)
  }

  updateMenu()

  tray.setToolTip('Clipmaster')
})

const updateMenu = () => {
  const menu = Menu.buildFromTemplate([
    {
      label: '<p style="font-size: 10px"></p>',
      click() {
        null
      }
    },
    { type: 'separator' },
    {
      label: 'Fechar',
      click() {
        app.quit()
      }
    }
  ])

  tray.setContextMenu(menu)
}
