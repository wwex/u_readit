// Modules
const {remote, shell} = require('electron')

// Manu template object
const template = [
    {
        label: 'Items',
        submenu: [
            {
                label: 'Add new',
                accelerator: 'CmdOrCtrl+O',
                click () { $('.open-add-modal').click() }
            },
            {
                label: 'Read Item',
                accelerator: 'CmdOrCtrl+Enter',
                click () { window.openItem() }
            },
            {
                label: 'Open in Browser',
                accelerator: 'CmdOrCtrl+Shift+Enter',
                click () { window.openInBrowser() }
            },
            {
                label: 'Delete Item',
                accelerator: 'CmdOrCtrl+Backspace',
                click () { window.deleteItem() }
            },
            {
                type: 'separator'
            },
            {
                label: 'Search Items',
                accelerator: 'CmdOrCtrl+S',
                click() { $('#search').focus() }
            }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            {role: 'undo'},
            {role: 'redo'},
            {role: 'separator'},
            {role: 'cut'},
            {role: 'copy'},
            {role: 'paste'},
            {role: 'pasteandmatchstyle'},
            {role: 'delete'},
            {role: 'selectall'},
        ]
    },
    {
        role: 'window',
        submenu: [
            {role: 'minimize'},
            {role: 'close'},
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More', 
                click() {shell.openExternal('https://www.google.com')}
            }
        ]
    }
]

// Mac specific
if (process.platform === 'darwin') {
    // Add first menu item
    template.unshift({ 
        label: remote.app.getName(),
        submenu: [
            {role: 'about'},
            {type: 'separator'},
            {role: 'services', submenu: []},
            {type: 'separator'},
            {role: 'hide'},
            {role: 'hideothers'},
            {role: 'unhide'},
            {role: 'unhide'},
            {type: 'separator'},
            {role: 'quit'}
        ]
    })
    template[3].submenu = [
        {
            label: 'Close',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        },
        {
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        },
        {
            label: 'Zoom',
            role: 'zoom'
        },
        {
            type: 'separator'
        },
        {
            label: 'Bring All to Front',
            role: 'front'
        }
    ]
}

// Add menu to app
const menu = remote.Menu.buildFromTemplate(template)
remote.Menu.setApplicationMenu(menu)