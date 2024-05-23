import { Menu, BrowserWindow } from 'electron';

const template = [
  {
    label: 'View',
    submenu: [
      { role: 'reload' as const },
      { role: 'forceReload' as const },
      {
        label: 'Screen One',
        // each menu item sends a 'navigate' message along with the screen name ('screenOne', 'screenTwo', 'screenThree') to the renderer process.
        click: () => {
          const focusedWindow = BrowserWindow.getFocusedWindow();
          if (focusedWindow) {
            focusedWindow.webContents.send('navigate', 'screenOne');
          }
        },
      },
      {
        label: 'Screen Two',
        click: () => {
          const focusedWindow = BrowserWindow.getFocusedWindow();
          if (focusedWindow) {
            focusedWindow.webContents.send('navigate', 'screenTwo');
          }
        },
      },
      {
        label:'Screen Three',
        click:()=>{
          const focusedWindow= BrowserWindow.getFocusedWindow();
          if(focusedWindow){
            focusedWindow.webContents.send('navigate','screenThree')
          }
        }
      }
    ],
  },
];

export const mainMenu = Menu.buildFromTemplate(template);
