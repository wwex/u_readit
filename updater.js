// Modules
const {dialog, BrowserWindow, ipcMain} = require('electron')
const {autoUpdater} = require('electron-updater')

// Enable logging
autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'

// Disable auto downloading
autoUpdater.autoDownload = false

// check for updates
exports.check = () => {
    // Start an update check
    autoUpdater.checkForUpdates()

    // Listen for dwonload (update) found
    autoUpdater.on('update-available', () => {

        // Track progress percent
        let downloadProgress = 0

        // Prompt user to update
        dialog.showMessageBox({
            type: 'info',
            title: 'Update available',
            message: 'A new version is available. Do you want to update now?',
            buttons: ['Update', 'No']
        }, (btnIndex) => {
            // If not 'update button, return
            if(btnIndex !== 0) return

            // Else start the download and show download progress in new window
            autoUpdater.downloadUpdate()

            // Create progress window
            let progressWin = new BrowserWindow({
                width: 350,
                height: 35,
                useContentSize: true,
                autoHideMenuBar: true,
                maximizable: false,
                fullscreen: false,
                fullscreenable: false,
                resizable: false
            })

            // Load progress HTML
            progressWin.loadURL(`file://${__direname}/renderer/progress.html`)

            // Handle win close
            progressWin.on('closed', () => {progressWin = null})

            // Listen for progress request from progressWin
            ipcMain.on('download-progress-request', (e) => {
                e.returnValue = downloadProgress
            })

            // Track dwonload progress on autoUpdater
            autoUpdater.on('download-progress', (d) => {
                downloadProgress = d.percent
                autoUpdater.logger.info(downloadProgress)
            })

            // Listen for completed update download
            autoUpdater.on('update-downloaded', () => {
                // Close the progressWin
                if(progressWin) progressWin.close()

                // Prompt user to quit and install update
                dialog.showMessageBox({
                    type: 'info',
                    title: 'Update Ready',
                    message: 'A new version of Readit is ready. Quit and install now?',
                    buttons: ['Yes', 'No']
                }, (buttonIndex) => {
                    // Update if 'Yes'
                    if(buttonIndex === 0) autoUpdater.quitAndInstall()
                })
            })

        })
    })
}