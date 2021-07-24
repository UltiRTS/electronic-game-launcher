

const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('gotSpeed', () => {
    console.log('got speed')
	try{
	getOSVer();}
	catch{kernelPanic()}
	
})
eventEmitter.on('gotOSVer', () => {
    console.log('got OSVER')
	try{getPath();}
	catch{kernelPanic()}
	
})

eventEmitter.on('gotPath', () => {
    console.log('got path')
	try{getDB();}
	catch{kernelPanic()}
	
})

eventEmitter.on('gotDB', () => {
    console.log('got db')
	try{
	getRemoteArchiveCheckSum();
    getMapAssociation();}
	catch{kernelPanic()}
	
})

eventEmitter.on('gotRemoteArchiveCheckSum', () => {
    console.log('got rCsum')
	try{
	getLocalArchiveCheckSum();}
	catch{kernelPanic()}
	
})

eventEmitter.on('gotLocalArchiveCheckSum', () => {
    console.log('got lCsum')
	try{
	checkForDifference()
	}
	catch{kernelPanic()}
	
})

eventEmitter.on('failedCheckDifference', () => {
    console.log('differential failure')
	try{
	downloadDifferentArchives()}
	catch{kernelPanic()}
	
})

eventEmitter.on('sourceIntact', () => {
    console.log('check for individual files')
	try{
	checkIndiMd5()}
	catch{kernelPanic()}
	
})


eventEmitter.on('indiMD5Unmatching', () => {
    console.log('indiMD5Unmatching')
	try{
	deletePathes();}
	catch{kernelPanic()}
	
})

eventEmitter.on('deletedPathes', () => {
	console.log('de path')
	try{
	extractFile()}
	catch{kernelPanic()}
	
	
})


eventEmitter.on('payloadIntact', () => {
    console.log('launching')
	try{
	launch();}
	catch{kernelPanic()}
	
})


