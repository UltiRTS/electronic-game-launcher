 
var messenger = require('messenger');
window.downloading=[]

ipcserver = messenger.createListener(3141);
ipcserver.on('dMap', function(message, data){
	
	//window.ipcmessage=message
	//window.ipcdata=data
	//console.log(data)
	//console.log(window.mapIndex[data][0])
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
		message.reply('retrieved|'+data);
		console.log('already have map!')
		
	}


})

ipcserver.on('ident', function(message, data){
	
	message.reply('identified|'+String(2*data));
	console.log('returing '+'identified|'+String(2*data))

})

/*
ipcserver.on('dAMap', function(message, data){
	
	for (map in window.mapIndex){
		window.downloading.push(map)
		downloadFile("http://ulti-repo.eterea.uk/electronic-updater/maps/"+window.mapIndex[map],window.wd+"/engine/maps/"+window.mapIndex[map],function (){
		//window.libunitsync.UnInit();
		
		
		downloadFile("http://ulti-repo.eterea.uk/electronic-updater/maps/"+map+'.png',window.wd+"/engine/maps/"+map+'.png',function (){message.reply('retrievedAll|'+map);removeFromDownloading(map)})
		
		})}
	
});

*/

function removeFromDownloading(data){
	const index = window.downloading.indexOf(data);
if (index > -1) {
  window.downloading.splice(index, 1);
}
	
}
