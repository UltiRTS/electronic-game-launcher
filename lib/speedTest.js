 
const NetworkSpeed = require('network-speed'); // ES6
const testNetworkSpeed = new NetworkSpeed();


async function getNetworkDownloadSpeed(url) {
  const baseUrl = url;
  const fileSizeInBytes = 500000;
  return testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes);
}
