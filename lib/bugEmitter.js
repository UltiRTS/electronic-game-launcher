function bugEmit(){
	console.log(' emittingBug ')
	document.getElementById('bars').classList.add("abnormalOperation");
	document.getElementById('bars').classList.remove("normalOperation");
	document.getElementById('autopilotStatus').innerHTML='Error Risk Detected: Autocorrecting <span class="normalCursor" id="cursor" style="visibility: visible;">_</span>'
}

function bugExterminate(){
	console.log('killedBug ')
	document.getElementById('bars').classList.remove("abnormalOperation");
	document.getElementById('bars').classList.add("normalOperation");
		document.getElementById('autopilotStatus').innerHTML='Autopilot Functioning Normally <span class="normalCursor" id="cursor" style="visibility: visible;">_</span>'

}

function kernelPanic(){
	document.getElementById('bars').classList.add("abnormalOperation");
	document.getElementById('bars').classList.remove("normalOperation");
	document.getElementById('autopilotStatus').innerHTML='Autopilot Failed: Please Restart.  <span class="" id="cursor" style="visibility: visible;">_</span>'
	document.getElementById('spinningIcon').classList.remove("spinningIcon");
	
}
