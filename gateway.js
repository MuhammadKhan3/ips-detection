const exec=require('child_process').exec


function getGateway(callback){
  return new Promise((resolve,reject)=>{
    exec("ipconfig /all", function (err, stdout, stderr) {
      if (err) {
        reject(err);
        return;
      }
        console.log('.....run.....');
              
        const lines = stdout.split('\n');
        const defaultGatewayLine = lines.find((line) => line.includes('Default Gateway'));
        const defaultGatewayArray=defaultGatewayLine.split(':');
        const defaultGateway=defaultGatewayArray[1].trim();
        resolve(defaultGateway)
    });
  }) 
}
module.exports=getGateway;