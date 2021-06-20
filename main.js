const { app, BrowserWindow } = require("electron");

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
}


//const { BrowserWindow } = require('electron')
//const win = new BrowserWindow({ width: 800, height: 600, frame: false })
//win.show()



app.on("ready", createWindow);
