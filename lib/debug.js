 function openDbug(){
	const curWebContents = require('@electron/remote').getCurrentWebContents();
	curWebContents.openDevTools();
}
