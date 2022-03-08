const { app, BrowserWindow } = require("electron");
const {ipcMain, dialog} = require('electron');


// in the main process:
const {initialize, enable} = require('@electron/remote/main');
initialize();

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule:true,
			contextIsolation: false
		},
		frame:false,
		width: 1371, height: 544
	});

	//mainWindow.maximize();
	mainWindow.setMenu(null)
	mainWindow.loadFile("index.html");
	mainWindow.webContents.openDevTools();

	mainWindow.on("closed", function () {
		mainWindow = null;
	});

	enable(mainWindow.webContents);
}


//const { BrowserWindow } = require('electron')
//const win = new BrowserWindow({ width: 800, height: 600, frame: false })
//win.show()



app.on("ready", createWindow);
/*
ipcMain.on('main', (cmd) => {
	switch (cmd) {
	  case 'getInstallPath':
		console.log('requesting path')
		
		break;

	  case 'toggleDevTools':
		mainWindow.webContents.toggleDevTools();
		break;
	}
  });*/

  ipcMain.on('getInstallPath', (event, arg) => {
	var path = dialog.showOpenDialog({
		properties: ['openDirectory']
	}).then( value => {
		console.log("seleted: ", value.filePaths);
		event.sender.send('gotInstallPath', value);//for eg : adds x and y
	})

	
  })