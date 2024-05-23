const electron = require('electron')

const { app, shell, BrowserWindow, ipcMain, Menu, Tray, nativeImage,screen } =  electron
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { mainMenu } from '../renderer/src/components/menu/menuMaker'
import fs from 'fs'


function createWindow(): void {

  const displays = screen.getAllDisplays()
  console.log(`${displays[0].size.width} x ${displays[0].size.height} `)
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // dialog.showOpenDialog(mainWindow, {
  //   buttonLabel:'select a photo',
  //   defaultPath:app.getPath("home"),
  //   properties:['multiSelections','createDirectory','openFile','openDirectory']
  // }).then (result => {
  //   console.log(result)
  // })

  // dialog.showSaveDialog(mainWindow, {}).then((result) => {
  //   if (!result.canceled) {
  //     const filePath = result.filePath
  //     // Replace "Your content here" with your actual content
  //     const content = 'Your content here'
  //     fs.writeFile(filePath, content, (err) => {
  //       if (err) {
  //         console.error('Error writing file:', err)
  //       } else {
  //         console.log('File saved successfully!')
  //       }
  //     })
  //   }
  // })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.openDevTools()
  Menu.setApplicationMenu(mainMenu)

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  electron.powerMonitor.on('resume',e => {
    if(!mainWindow) createWindow()
  })
  
  electron.powerMonitor.on('suspend',e => {
    console.log('saving some data');
  })

}

let tray

app.whenReady().then(() => {
  const icon = nativeImage.createFromPath('trayTemplate@2x.png')
  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('This is my application')
  tray.setTitle('This is my title')

  tray.setContextMenu(contextMenu)

  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  // ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
ipcMain.handle("saveText", async (event, textValue) => {
  const filePath:string = "c:\\electron\\Temporary\\file1.txt";

  try {
    // Check if the file exists
    const fileExists = await fs.promises.access(filePath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      // Create the file if it doesn't exist
      await fs.promises.writeFile(filePath, '', 'utf8');
      console.log('File created:', filePath);
    }

    // Append the text to the file
    await fs.promises.appendFile(filePath, textValue + "\n", 'utf8');
    console.log('Text appended:', textValue);
  } catch (err) {
    console.error('Error handling file:', err);
  }
});
