
// Modules
const {app, ipcMain} = require('electron')
const mainWindow = require('./mainWindow')
const readItem = require('./readItem')

// Enable Electron-Reload
// require('electron-reload')(__dirname)

// Disable Hardware Acceleration
// if error: [1252:0108/190652.218:ERROR:gles2_cmd_decoder.cc(18047)] [.BrowserCompositor-00000273FA935010]GL ERROR :GL_INVALID_OPERATION : glCreateAndConsumeTextureCHROMIUM: invalid mailbox name
app.disableHardwareAcceleration()

// Listen for new read item
ipcMain.on('new-item', (e, itemURL) => {
  // Get read item with readItem module
  readItem(itemURL, (item) => {
    // Send to renderer
    e.sender.send('new-item-success', item)
  })
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', mainWindow.createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) mainWindow.createWindow()
})
