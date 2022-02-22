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
 

