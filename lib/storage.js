 
 const Store = require('electron-store');
 
 const store = new Store();
 
 


function clearCache(){
	store.delete('window.wd')
}
