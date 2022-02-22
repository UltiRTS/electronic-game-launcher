 
var messenger = require('messenger');
window.downloading=[]

ipcserver = messenger.createListener(3141);
ipcserver.on('dMap', function(message, data){
	

	try{md5=md5File.sync(window.wd+'/ultiConfig/maps/'+window.mapIndex[data][0])}
	catch{md5='NA'}
	
	if (window.downloading.includes(data)){console.log('already downloading')}
	else if (!data in window.mapIndex)
		{message.reply('error|'+data);console.log('unable to find map from indexer'+String(data))}
	else if(md5!=window.mapIndex[data][1]){
		window.downloading.push(data)
		console.log('mapmd5: '+md5+':'+window.mapIndex[data][1]+" isdownloading: "+String(window.downloading.includes(data)))
		
		
		downloadFile("http://ulti-repo.eterea.uk/dNTPDl/tmpMap/"+window.mapIndex[data][0],window.wd+"/ultiConfig/maps/"+window.mapIndex[data][0],function (){
		downloadFile("http://ulti-repo.eterea.uk/dNTPDl/tmpMap/"+data+'.png',window.wd+"/ultiConfig/maps/"+data+'.png',function (){message.reply('retrieved|'+data);removeFromDownloading(data)})
		
		})
		}
	
	else {
		message.reply('already|'+data);
		console.log('already have map!')
		
	}


})

ipcserver.on('ident', function(message, data){
	
	message.reply('identified|'+String(2*data));
	console.log('returing '+'identified|'+String(2*data))

})

ipcserver.on('gPath', function(message, data){
	
	message.reply('gPath|'+window.wd);
	console.log('lobby requested path'+window.wd)

})


function removeFromDownloading(data){
	const index = window.downloading.indexOf(data);
if (index > -1) {
  window.downloading.splice(index, 1);
}
	
}
