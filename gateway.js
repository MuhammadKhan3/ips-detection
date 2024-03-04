const exec=require('child_process').exec
const ping = require('ping')


function getGateway(callback){
  return new Promise((resolve,reject)=>{
    exec("ipconfig /all", function (err, stdout, stderr) {
      if (err) {
        reject(err);
        return;
      }
              
        const concatenatedLines = [];
        const lines = stdout.split('\n');
        let defaultGatewayLine = lines.filter((line) => line.includes('Default Gateway') || line.includes('Wireless LAN adapter Wi-Fi') || line.includes('Ethernet adapter Ethernet'));
        defaultGatewayLine = defaultGatewayLine.map((line) => {
          return line.includes('Default Gateway') 
              ? line.split(':')[1].trim() 
              : line.split(':')[0];
        });        
        for (let i = 0; i < defaultGatewayLine?.length; i += 2) {
           const currentLine = defaultGatewayLine[i].concat(':', defaultGatewayLine[i + 1] || ''); // concatenate current and next line (or empty string if there's no next line)
           concatenatedLines.push(currentLine);
        }

        resolve(concatenatedLines)
    });
  }) 
}


async function aliveIps(defaultGateway){
  let ips=[];
  const dg_array = defaultGateway.split('.');
  let ip = `${dg_array[0]}.${dg_array[1]}.${dg_array[2]}`;
  let promises = [];

  for (let port = 2; port < 255; port++) {
      promises.push(ping.promise.probe(`${ip}.${port}`)
          .then(async function (res) {

              const data = res?.output?.search(/Request timed out/i);

              if (res.alive || data >= 0) {
                  ips.push(res.host);
              } 
          })
      );
  }

  await Promise.all(promises);
  return ips;
}


module.exports = {getGateway,aliveIps};