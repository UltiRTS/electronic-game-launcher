firstRun=true
longMsgOverhead=0

function pushOutline(type,msg){
	finalMsg="["+type+"] "+msg+"<br>"
	document.getElementById("msgOutline").innerHTML+=finalMsg
	}

function pushLongmsg(msg){
	window.finalMsg=msg
	if (firstRun){
		window.animateLongmsg = setInterval(_pushUp, 50);
	}
	document.getElementById("longMsgTxt").innerHTML+=window.finalMsg
	window.firstRun=false
}

function _pushUp(){
	window.longMsgOverhead-=0.5
	//console.log("fadeleave triggered"+window.longMsgOverhead)
	document.getElementById("longMsgTxt").style.top = window.longMsgOverhead;
}
