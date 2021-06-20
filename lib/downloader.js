var url = require("url")
var path = require("path")

const { startDownload } = require('su-downloader3-enhance')
var sizeOfBiggestFile = 0
var biggestFileName = ""

 
function nullFunction()
{
	return null
}

function downloadFile(target_url , file_name, callBackFunc){
	
	var file_path = path.join(file_name)
	var locations = { url: encodeURI(target_url), savePath: file_path }
	var options = {
		threads: 10, 
		throttleRate: 100
	}
	console.log("Download started for " + file_name);
	startDownload(locations, options).subscribe({
		next: progressInfo => {
			total = progressInfo['total'];
			if(total) {
				if(total.filesize > sizeOfBiggestFile) {
					sizeOfBiggestFile = total.filesize;
					biggestFileName = file_name;
				}

				if(total.filesize == sizeOfBiggestFile) showProgress(total['downloaded'], total['filesize']);
			}
		},  
		error: e => {console.log(e);callBackFunc();},
		complete: () => {
			console.log("Downloaded " + file_name);
			if(biggestFileName == file_name) showProgress(1,1);
			callBackFunc();
		}
	})
}
 
function showProgress(received, total){
	var percentage = (received * 100) / total;
	pushLongmsg(percentage + "% | " + received + " bytes out of " + total + " bytes.");
	progressUpdate("downloadbar",percentage/100)
}
 
 
 
 
