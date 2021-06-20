window.isPlaying=false
window.userVolume=50
// convert nodejs buffer to ArrayBuffer 
// then deliver ArrayBuffer to AudioContext().decodeAudioData(buffer, successHanlder, errhandler)
function toArrayBuffer(buf) {
	var ab = new ArrayBuffer(buf.length);
	var view = new Uint8Array(ab);
	for (var i = 0; i < buf.length; ++i) {
		view[i] = buf[i];
	}
	return ab;
}

// new one
function playSound(file, loop) {
	
	
	
	if(!window.audioCtx) {
		window.audioCtx = new AudioContext();
		
		window.contextGain = window.audioCtx.createGain();
		
		// connect to context
		window.contextGain.connect(window.audioCtx.destination);
		actuallyPlay()
		
	} else {
		
		
		//window.contextGain.gain.linearRampToValueAtTime(0, context.currentTime+fadeDuration);
		var instaVolDuringFade=50
		loading(true)
		window.ramp=setInterval(
			function(){
				if(instaVolDuringFade<=0){clearInterval(window.ramp);actuallyPlay()}
				else{instaVolDuringFade-=4;window.contextGain.gain.setValueAtTime((window.userVolume/100)*(instaVolDuringFade/50), window.audioCtx.currentTime)}
				
			},100)
		
	}
	

	
	function actuallyPlay(){
	//window.contextGain.gain.setValueAtTime(window.userVolume/100, window.audioCtx.currentTime);
		window.contextGain.gain.setValueAtTime(window.userVolume/100, window.audioCtx.currentTime);
		var prefix = __dirname+'/assets/';
		
		try {
				window.sourceIntro.disconnect(window.contextGain);
				window.sourceLoop.disconnect(window.audioDelay);
				
			}
			catch{}
			window.isPlaying = true;
		if(loop) {
			// if is playing disconnect it
			

			

			window.sourceIntro = window.audioCtx.createBufferSource();
			window.sourceLoop = window.audioCtx.createBufferSource();


			var bufferIntro = toArrayBuffer(fs.readFileSync(prefix + file));
			var bufferLoop = toArrayBuffer(fs.readFileSync(prefix + 'loop_' + file));


			window.audioCtx.decodeAudioData(bufferIntro, buf => {
				var duration = buf.duration;
				//sourceIntro.buffer = buf;
				window.sourceIntro.buffer = buf

				//window.sourceIntro.connect(window.sourceIntro);
				// intro fade in
				window.sourceIntro.connect(window.contextGain);
				// set to disconnect
				//window.sourceIntro = gainIntro;

				//gainIntro.gain.setValueAtTime(0, context.currentTime+10);
				
				
				
				window.audioDelay = window.audioCtx.createDelay(duration-0.03);
				//var delayNode = context.createDelay()
				window.audioDelay.delayTime.value = duration-0.03;
				window.audioDelay.connect(window.contextGain);

				window.audioCtx.decodeAudioData(bufferLoop, buf => {
					
					window.sourceLoop.buffer = buf;
					sourceLoop.loop = true;

					// set loop fade in
					//gainLoop.gain.setValueAtTime(0, context.currentTime);
					//gainLoop.gain.linearRampToValueAtTime(1, context.currentTime + 1);

					window.sourceLoop.connect(window.audioDelay);
					try{loading(false)}
					catch{}
					
					window.sourceLoop.start(0);window.sourceIntro.start(0);
					
				});
			});

		} else {
			window.sourceIntro = window.audioCtx.createBufferSource();
			var buffer = toArrayBuffer(fs.readFileSync(prefix + file));
			window.audioCtx.decodeAudioData(buffer, buf => {
				window.sourceIntro.buffer = buf;
				window.sourceIntro.connect(window.contextGain);
				//window.contextGain.gain.setValueAtTime(window.userVolume/100, window.audioCtx.currentTime);source.start(0);},fadeDuration*1000
				try{loading(false)}
		catch{}
				window.sourceIntro.start(0)
			});
		}
	
	}
}
	function stopSound(){
		var instaVolDuringFade=50
		window.ramp=setInterval(
			function(){
				if(instaVolDuringFade<=0){clearInterval(window.ramp);	try {window.sourceIntro.disconnect(window.contextGain);window.sourceLoop.disconnect(window.audioDelay);}catch{}}
				else{instaVolDuringFade-=4;window.contextGain.gain.setValueAtTime((window.userVolume/100)*(instaVolDuringFade/50), window.audioCtx.currentTime)}
				
			},100)
		
	}

playSound('title.wav',true)
