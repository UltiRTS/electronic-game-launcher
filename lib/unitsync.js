const { remote } = require('electron')
const os = require('os');
const exec = require('child_process').exec;
//const ffi = require('ffi-napi');
//const ref = require('ref-napi');
//const fs = require('fs');
//const path = require('path');




 window.isLinux = os.type()=='Linux';
 
 
 
 function	runCmd(command, callback){
	 exec(command, (error, stdout, stderr) => { 
		 callback(stdout)
		 console.log(stdout); 
	 });
 };
 

function writeFile(path,content,callback){
	fs.writeFile(path, content, callback);
	
	
}

function usyncWriteScript(){
	hostPort=window.roomPort[window.nowinBattle]
	hostIP=window.roomIP[window.nowinBattle]
	content="[GAME]\n{\nHostIP="+hostIP+";\nHostPort="+hostPort+";\nSourcePort=0;\nIsHost=0;\nMyPlayerName="+window.username+";\nMyPasswd="+window.btlToken+";\n}\n"
	writeFile(process.env.WDIR+'/engine/_script.txt',content,()=>{
	if(window.isLinux){
		runCmd("\'"+process.env.WDIR+'/engine/spring\' \''+process.env.WDIR+'/engine/_script.txt\'', (output) => { 
			console.log(output);
			window.runningEngineCount-=1
			if(window.runningEngineCount==0){
			playSound('lobby_intro.wav',true)}
			restoreWindow()
			 
		});}
		else{
			console.log('start \"\" \"'+process.env.WDIR+'\\engine\\spring.exe\" \"'+process.env.WDIR+'\\engine\\_script.txt\"')
			runCmd('start \"\" \"'+process.env.WDIR+'\\engine\\spring.exe\" \"'+process.env.WDIR+'\\engine\\_script.txt\"', (output) => {
			console.log(output);
			window.runningEngineCount-=1
			if(window.runningEngineCount==0){
			playSound('lobby_intro.wav',true)}
			restoreWindow()
			 
		});}
		stopSound()
		minimizeWindow()
		 window.runningEngineCount+=1
	})
}
 
 function restoreWindow() {
	 remote.getCurrentWindow().maximize();
 }
 
 function minimizeWindow() {
	 remote.getCurrentWindow().minimize();
 }
 



/*



function listAllLocalMapNames() {
    isOpen = window.libunitsync.Init(0, 0);   //this will hang the process!
    if(isOpen) console.log("OPENED VFS in retrieving map list.");
    mapCount = window.libunitsync.GetMapCount();
    mapList = [];
    for(i=0; i<mapCount; i++) {
        mapName = window.libunitsync.GetMapName(i);
        mapList.push(mapName);
    }

    //libunitsync.UnInit();

    return mapList;
}

function showMinimap(mapName, reduction=0) {

    var width = 1024
    var height = 1024


	
    isOpen = window.libunitsync.Init(0, 0);
    //if(isOpen) console.log("OPENED at retrieving minimap.");

    buffer = window.libunitsync.GetMinimap(mapName, reduction).reinterpret(width * height * 2);

    //libunitsync.UnInit();

	let canvas = document.querySelector('canvas');
    let ctx = canvas.getContext('2d');
    let imgData = ctx.createImageData(width, height);
    let pixelsColorInfo = _convert565toImageData(buffer, width, height);
    //console.log(pixelsColorInfo.length);
    //console.log(imgData.data.length);

    let pixelIndex = 0;
    for(let i=0; i<imgData.data.length && pixelIndex<pixelsColorInfo.length; i+=4) {
        pixel = pixelsColorInfo[pixelIndex];
        imgData.data[i] = pixel[0];
        imgData.data[i+1] = pixel[1];
        imgData.data[i+2] = pixel[2];
        imgData.data[i+3] = 255;
        pixelIndex++;
    }
    ctx.putImageData(imgData, 0, 0);
	window.libunitsync.UnInit();
	//document.getElementById('minimapIMG').src=canvas.toDataURL()
    return '<div class="minimap" style="margin:0.2vw;width:2vw;height:2vw;background: red;transform: rotateY(45deg);"><img style="position:absolute;width:100%;height:100%;" id="minimapPile'+mapName+'" src="' + canvas.toDataURL() + '" /></div>'
   
}





function _convert565toImageData(buffer, height, width) {
    curPixelIndex = 0;
    pixels = []
    while(curPixelIndex < height*width*2) {
        rgb = _getPixelColor(buffer.subarray(curPixelIndex, curPixelIndex+2));
        pixels.push(rgb);
        curPixelIndex += 2;
    }

    return pixels;
}

function _getPixelColor(pixel) {
    pixelBE = pixel[0];
    pixelLE = pixel[1];
    red = pixelBE & 0xF8;
    green = pixelBE & 0x07 + pixelLE & 0xE0;
    blue = pixelLE & 0x1F;

    return [red, green, blue];
}
*/
