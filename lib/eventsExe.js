const sqlite3 = require('sqlite3');
archives_checksum={}
localArchives_checksum={}
banheader=''
safedir='ultiConfig'
window.mapIndex={}
const md5File = require('md5-file')
const forceDelete = require('fs-force-delete')
	var AdmZip = require('adm-zip');
const shell = require('shelljs');
const fs=require('fs');
const crypto = require('crypto');

async function testSpeed(){
	window.repo='http://ulti-repo.eterea.uk/'
	
	eventEmitter.emit('gotSpeed');
}

function switchMirror(){
	if(window.repo=='http://ulti-repo.eterea.uk/')
	{window.repo='http://ulti-repo.eterea.uk/'}
	else{window.repo='http://ulti-repo.eterea.uk/'}
	
}

function getOSVer(){
	window.isLinux=(os.type()=='Linux')
	eventEmitter.emit('gotOSVer');
	if (window.isLinux){banHeader='win'}else{banHeader='linux'}
	console.log('got os ver')
}


function getPath(){
	
	if(store.has('window.wd')) {
    //updateProgress()
		console.log('already installed')
		window.wd = store.get('window.wd');
		eventEmitter.emit('gotPath');}
	else{
		bugEmit()
		document.getElementById('blocker').style.visibility=''
		document.getElementById('wd').className='warning'
		document.getElementById('hint').className='hint'
		document.getElementById('mask').className='mask'


	}
	
}


function getPathUsingDialog(){
	document.getElementById('blocker').style.visibility='hidden';
	ipcRenderer.send('getInstallPath',{});



	
}


function getDB(){
	downloadFile(window.repo+"dNTPDl/info.db",window.wd+"/info.db",function (){eventEmitter.emit('gotDB')})
}

function getRemoteArchiveCheckSum(){
	const db = new sqlite3.Database(window.wd+'/info.db');
	//Retrieving All Rows
	db.all("SELECT zip_name, extract_to,zip_hash FROM archives", (error, rows) => {
    rows.forEach((row) => {
        archives_checksum[row.zip_name]=[]
		archives_checksum[row.zip_name][0]=row.extract_to
		archives_checksum[row.zip_name][1]=row.zip_hash
    })
	
		eventEmitter.emit('gotRemoteArchiveCheckSum')
	});
}

function getMapAssociation(){
	const db = new sqlite3.Database(window.wd+'/info.db');
	//Retrieving All Rows
	db.all("SELECT id, map_name, map_filename, map_hash FROM maps", (error, rows) => {
    		rows.forEach((row) => {
        	window.mapIndex[row.map_name]={}
        		window.mapIndex[row.map_name]['fileName']=row.map_filename
        		window.mapIndex[row.map_name]['hash']=row.map_hash
				window.mapIndex[row.map_name]['id']=row.id
		})
	});
}

function getLocalArchiveCheckSum(){
	totalZips=0
	processedZips=0
	for (zipName in archives_checksum){
		localArchives_checksum[zipName]=[]
		try{
			localArchives_checksum[zipName][0] = md5File.sync(window.wd+'/'+zipName)
			
		}
		catch{localArchives_checksum[zipName][0]='nohash';localArchives_checksum[zipName][1]=true;processedZips+=1;}}
		
		
	eventEmitter.emit('gotLocalArchiveCheckSum')
}

function checkForDifference(){
	console.log('checkForDifference RUN!')
	var failed=false
	for(zipName in archives_checksum){
		//console.log(zipName+': '+archives_checksum[zipName][1]+' VS '+localArchives_checksum[zipName][0])
		if (archives_checksum[zipName][1]!=localArchives_checksum[zipName][0]&&!zipName.startsWith(banHeader)){
			failed=true
			localArchives_checksum[zipName][1]=true
			
		}
	}
	console.log('checkForDifference mid; failed:'+failed)
	if (failed){eventEmitter.emit('failedCheckDifference');bugEmit()}
	else{console.log('sourceIntact');bugExterminate();eventEmitter.emit('sourceIntact');}
	console.log('checkForDifference out; failed:'+failed)
}



function downloadDifferentArchives(){
	totalDownloads=0
	downloaded=0
	
	for (zipName in archives_checksum){
		if (localArchives_checksum[zipName][1]&&!zipName.startsWith(banHeader)){
			totalDownloads+=1
			downloadFile(window.repo+"dNTPDl/archives/"+zipName,window.wd+'/'+zipName,function (){
				downloaded+=1
				if (downloaded>=totalDownloads){eventEmitter.emit('gotRemoteArchiveCheckSum')} //sends back to where its about to check local checksum
			})
		}
		
	}
}

function deletePathes(){
	totalD=0
	currentD=0
		for (zipName in archives_checksum){
			if (archives_checksum[zipName][0].includes(safedir)){continue}   //if a stress response if triggered by other archive mismatch, dont delete things in the safedir
		totalD+=1
		//console.log('trying to d'+window.wd+'/'+archives_checksum[zipName][0])
		forceDelete(window.wd+'/'+archives_checksum[zipName][0],(error, info) => { currentD++;if(currentD>=totalD){mkdir()}}) 
		 //shell.mkdir('-p', window.wd+'/'+archives_checksum[zipName][0]);
		 

	}
	function mkdir(){
		for (zipName in archives_checksum){
		
		console.log('trying to d'+window.wd+'/'+archives_checksum[zipName][0])
		//forceDelete(archives_checksum[zipName][0]) 
		 shell.mkdir('-p', window.wd+'/'+archives_checksum[zipName][0]);
		 

	}
		eventEmitter.emit('deletedPathes')
	}
	
}

async function checkIndiMd5(){
	failed=false
	sourceMd5={}
	for (zipName in archives_checksum){
		await new Promise(resolve => setTimeout(resolve, 0));
		//do not check files in archives that's extracted straight on top of a safe dir
		if (zipName.startsWith(banHeader)){continue}
		//console.log('checking for '+window.wd+'/'+zipName)
		zip = new AdmZip(window.wd+'/'+zipName);
		zip.getEntries().map(entry => {
			md5Hash = crypto.createHash('md5').update(entry.getData()).digest('hex');
			//console.log(entry);
			if (!entry.isDirectory){ sourceMd5[window.wd+'/'+archives_checksum[zipName][0]+'/'+entry.entryName]=md5Hash}
			
		});
	}
	//console.log(sourceMd5)
	for (fEntry in sourceMd5){
		try{
			//console.log('individual files: '+fEntry+' : '+md5File.sync(fEntry)+' VS '+sourceMd5[fEntry])
			//console.log(md5File.sync(fEntry) in sourceMd5)
			await new Promise(resolve => setTimeout(resolve, 0));
			if (md5File.sync(fEntry) != sourceMd5[fEntry]){
				failed=true
				console.log('failed file '+fEntry)
			}}
		catch{
			failed=true
			console.log('failed file (404)'+fEntry)
		}
	}
		
	if (failed){eventEmitter.emit('indiMD5Unmatching');bugEmit()}
	else{eventEmitter.emit('payloadIntact');console.log('payload intact');bugExterminate()}
	
}

async function extractFile(){
		totalExtract=0
		elapsedExtract=0
		for (zipName in archives_checksum){
			if (zipName.startsWith(banHeader)){continue}
			totalExtract+=1
			//await unzip.Open.file(window.wd+'/'+zipName).then(d => d.extract({path: window.wd+'/'+archives_checksum[zipName][0], concurrency: 5}));
			
			
			console.log(archives_checksum[zipName][0])
			
		
		
			
		/*	extract(window.wd+'/'+zipName, { dir: window.wd+'/'+archives_checksum[zipName][0] }, function (err) {
				elapsedExtract++
				if (elapsedExtract>=totalExtract){eventEmitter.emit('extractedLocalArchives')}
				console.log(err)
			})
		*/	
			var zip = new AdmZip(window.wd+'/'+zipName);
			zip.extractAllTo(window.wd+'/'+archives_checksum[zipName][0], /*overwrite*/true);

			
			
			
			
		}
		eventEmitter.emit('sourceIntact')  //this will send it back to the stage where its about to check individual files

  	
}



function launch(){
    stopSound()
	clearInterval(window.animateLongmsg);
	if (window.isLinux){
		_execute("chmod +x "+window.wd+"/* && "+window.wd+"/lobby/*.AppImage --appimage-extract-and-run",function(std,err){})
		_execute("ls "+window.wd,nullFunction)
		_execute("ls "+window.wd+"/lobby/",nullFunction)
		//_execute("chmod +x "+window.wd+"/lobby/ulti-lobby-0.0.0.AppImage&& "+"WDIR="+window.wd+" "+window.wd+"/lobby/*.AppImage --appimage-extract-and-run",nullFunction)
		//_execute("chmod +x "+window.wd+"/lobby/ulti-lobby-0.0.0.AppImage&& "+"WDIR="+window.wd+" "+window.wd+"/lobby/*.AppImage --appimage-extract-and-run",nullFunction)
	}
	else{
		_execute(" start \"\" \""+window.wd+"\\lobby\\lobby.exe\"",function(std,err){})
	}


}


function _execute(command, callback) {
	exec(command, (error, stdout, stderr) => {
		//console.log(stdout)
		console.log(stderr)
		callback(stdout,stderr);
	});
}



function updateProgress(){
    window.completedEvent++;
    progress=(window.completedEvent/window.totalEvents*100).toFixed(2);
    document.getElementById('totalProgress').innerHTML=progress+'%'
}
