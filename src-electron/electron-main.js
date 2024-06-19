/*
  imports
*/

  import { app, BrowserWindow, Menu } from 'electron'
  import path from 'path'
  import os from 'os'


/*
  constants & variables
*/

  // needed in case process is undefined under Linux
  const platform = process.platform || os.platform()
  let mainWindow

  const isMac = process.platform === 'darwin'

  const menuTemplate = [
    // { role: 'appMenu' }
    ...(isMac
      ? [{
          label: app.name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
          ]
        }]
      : []),
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    // { role: 'editMenu' }
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac
          ? [
              { role: 'pasteAndMatchStyle' },
              { role: 'delete' },
              { role: 'selectAll' },
              { type: 'separator' },
              {
                label: 'Speech',
                submenu: [
                  { role: 'startSpeaking' },
                  { role: 'stopSpeaking' }
                ]
              }
            ]
          : [
              { role: 'delete' },
              { type: 'separator' },
              { role: 'selectAll' }
            ])
      ]
    },
    // { role: 'viewMenu' }
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    // { role: 'windowMenu' }
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac
          ? [
              { type: 'separator' },
              { role: 'front' },
              { type: 'separator' },
              { role: 'window' }
            ]
          : [
              { role: 'close' }
            ])
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://electronjs.org')
          }
        }
      ]
    }
  ]
  
  const menu = Menu.buildFromTemplate(menuTemplate)
  

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
