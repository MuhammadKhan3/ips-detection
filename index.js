const ping = require('ping')
const getGateway = require('./gateway')
class  DiscoverIP {

    async getIPs() {
        try {
            let ips = [];
    
            const defaultGateway = await getGateway();
    
            console.log("Default Gateway:", defaultGateway);
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
            console.log('IPs found:', ips);
            return ips;
        } catch (error) {
            console.error('Error in getIPs:', error);
            throw error; // Re-throw the error to propagate it to the caller
        }
    }
    


}

module.exports=DiscoverIP
const Dis=new DiscoverIP();

Dis.getIPs().then((ips)=>{
    console.log(ips)
})
