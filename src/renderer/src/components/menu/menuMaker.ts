// const { app, Menu } = require("electron");
import {app,Menu,MenuItemConstructorOptions} from 'electron';

// Check for macOS platform
const isMac = process.platform === "darwin";

// function doOpenFile() {
//   console.log("File opened");:
// }

const template:[] = [
  // macOS-specific menu (if applicable)
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [{ role: "about" }, { type: "separator" }, { role: "quit" }],
        },
      ]
    : []),

  // File menu
  {
    label: "File",
    submenu: [
      { label: "New Text File", accelerator: "CmdOrCtrl+N"  },
      { label: "New File" },
      { label: "New Window",accelerator: "CmdOrCtrl+Shift+N" },
      { type: "separator" },
      { label: "Open File",accelerator: "CmdOrCtrl+O" },
      { label: "Open Folder" },
      

      // Open Recent with submenu indicator
      {
        label: "Open Recent",
        submenu: [
          {
            label: "Reopen Closed Editor",
            click: () => {
              // Your action here
            },
          },
        ],
      },
      { type: "separator" },
      { label: "Add Folder to WorkSpace" },
      { label: "Save WorkSpace As" },
      { label: "Duplicate WorkSpace" },
      { type: "separator" },
      { label: "Save", accelerator: "CmdOrCtrl+S"   },
      { label: "Save As..." },
      { label: "Save All" },
      { type: "separator" },
      { 
        label: "Share" ,
        submenu: [
          {
            label: "Import Profile",
            click: () => {
              // Your action here
            },
          },
          {
            label: "Export Profile",
            click: () => {
              // Your action here
            },
          },
        ],
      },
      { type: "separator" },
      { label: "Auto Save" },
      
      
      {
        label: "Preference",
        submenu: [
          {
            label: "Profiles (default)",
            submenu: [
              {
                label: "default",type: 'checkbox', checked: true,
                click: () => {
                  // Your action here
                },
              },
              {
                label: "Show Profile Contents",
                click: () => {
                  // Your action here
                },
              },
              {
                label: "Create Profile",
                click: () => {
                  // Your action here
                },
              },
              {
                label: "Export Profile...",
                click: () => {
                  // Your action here
                },
              },
              {
                label: "Import Profile...",
                click: () => {
                  // Your action here
                },
              },
            ],
          },

      {
        label: "Settings",
        click: () => {
          // Your action here
        },
      },
      {
        label: "Extensions",
        click: () => {
          // Your action here
        },
      },
      // ... (add similar entries for Keyboard Shortcuts, Theme, etc.)
      {
        label: "Backup and Sync Settings...",
        click: () => {
          // Your action here
        },
      },
    ],
  },



    ],
  },

  // Edit menu
  {
    label: "Edit",
    submenu: [
      { role: "undo" },
      { role: "redo" },

      { type: "separator" },

      { role: "cut" },
      { role: "copy" },
      { role: "paste" },
      ...(isMac ? [{ role: "PasteAndMatchStyle" }, { type: "separator" }] : []),
      { role: "delete" },
      { type: "separator" },
      { role: "selectAll" },
    ],
  },

  // View menu
  {
    label: "View",
    submenu: [{ role: "reload" }, { role: "forceReload" }],
  },

  // My Menu with submenu indicator
  {
    label: isMac ? "Window" : "My Menu",
    submenu: [
      { role: "minimize" },
      { role: "zoom" },
      ...(isMac
        ? [
            { type: "separator" },
            { role: "front" },
            { type: "separator" },
            { role: "window" },
          ]
        : [{ role: "close" }]),
      {
    
        label: "hai", 
        submenu: [
       
          {
            label: "Submenu Option 1",
            click: () => {
              // Your action here
            },
          },
          {
            label: "Submenu Option 2",
            click: () => {
              // Your action here
            },
          },
        ], 
      },
    ],
  },
];

const contextTemplate:MenuItemConstructorOptions[]= [
  {
    label: "options",
    submenu: [
      {
        label: "Do something",
        click: () => {
          alert("welcome!");
        },
      },
    ],
  },
  {
    label: "Some more options",
  },
];
export const mainMenu = Menu.buildFromTemplate(template);
export const popMenu = Menu.buildFromTemplate(contextTemplate);