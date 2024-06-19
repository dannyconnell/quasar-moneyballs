/*
  imports
*/

  import { app, BrowserWindow, Menu, ipcMain } from 'electron'
  import path from 'path'
  import os from 'os'
  import { menuTemplate } from './menu/menu'


/*
  constants & variables
*/

  // needed in case process is undefined under Linux
  const platform = process.platform || os.platform(),
        menu = Menu.buildFromTemplate(menuTemplate)
  export let mainWindow


/*
  app ready
*/

  app.whenReady().then(() => {

    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
      icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
      width: 1480, // just for danny
      height: 990, // just for danny
      minWidth: 768,
      minHeight: 512,
      zoomFactor: 7.0, // just for danny
      useContentSize: true,
      webPreferences: {
        contextIsolation: true,
        // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
        preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD)
      }
    })

    mainWindow.loadURL(process.env.APP_URL)

    if (process.env.DEBUGGING) {
      // if on DEV or Production with debug enabled
      mainWindow.webContents.openDevTools()
    } else {
      // we're on production; no access to devtools pls
      mainWindow.webContents.on('devtools-opened', () => {
        mainWindow.webContents.closeDevTools()
      })
    }

    mainWindow.on('closed', () => {
      mainWindow = null
    })

    Menu.setApplicationMenu(menu)

  })
  

/*
  app events
*/

  app.on('window-all-closed', () => {
    app.quit()
  })


/*
  ipc events
*/

  ipcMain.on('quit-app', () => {
    app.quit()
  })

