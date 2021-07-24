 function openDbug(){
	const currentWebContents = require('electron').remote.getCurrentWebContents();
	currentWebContents.openDevTools();
}
