const exec=require('child_process').exec


function getGateway(callback:any){
  return new Promise((resolve,reject)=>{
    exec("ipconfig /all", function (err: any, stdout: any, stderr: any) {
        if (err) {
            reject(err);
            return;
        }
        
        const lines = stdout.split('\n');
        const defaultGatewayLine = lines.find((line: string | string[]) => line.includes('Default Gateway'));
        const defaultGatewayArray=defaultGatewayLine.split(':');
        const defaultGateway=defaultGatewayArray[1].trim();
        resolve(defaultGateway)
    });
  }) 
}
module.exports=getGateway;