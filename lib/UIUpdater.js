
function titleUpdate(id,toTitle){
	pushOutline("INFO","updating title.")
    _titleAnimate(id,toTitle)
}

function _titleAnimate(id,toTitle){
    document.getElementById(id).className="tagAnime";
    
   
    setTimeout(function(id){document.getElementById(id).innerHTML=toTitle; document.getElementById(id).classList.add("tagAnime2"); }, 3000,id);
}



function progressUpdate(id,percentage){
	document.getElementById(id).innerHTML="▀"
	
	while (percentage>=0){
		document.getElementById(id).innerHTML+="▀"
	
		percentage-=0.01
	}
	
}

