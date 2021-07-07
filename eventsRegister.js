

const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('gotSpeed', () => {
    console.log('got speed')
	getOSVer();
	
})
eventEmitter.on('gotOSVer', () => {
    console.log('got OSVER')
	getPath();
	
})

eventEmitter.on('gotPath', () => {
    console.log('got path')
	getDB();
	
})

eventEmitter.on('gotDB', () => {
    console.log('got db')
	getRemoteArchiveCheckSum();
    getMapAssociation();
	
})

eventEmitter.on('gotRemoteArchiveCheckSum', () => {
    console.log('got rCsum')
	getLocalArchiveCheckSum();
	
})

eventEmitter.on('gotLocalArchiveCheckSum', () => {
    console.log('got lCsum')
	checkForDifference()
	
})

eventEmitter.on('failedCheckDifference', () => {
    console.log('differential failure')
	downloadDifferentArchives()
	
})

eventEmitter.on('sourceIntact', () => {
    console.log('check for individual files')
	checkIndiMd5()
	
})


eventEmitter.on('indiMD5Unmatching', () => {
    console.log('indiMD5Unmatching')
	deletePathes();
	
})

eventEmitter.on('deletedPathes', () => {
	console.log('de path')
	extractFile()
	
	
})


eventEmitter.on('extractedLocalArchives', () => {
    console.log('launching')
	launch();
	
})


