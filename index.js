const gateway = require('./gateway')
class  DiscoverIP {

    async getIPs() {
        try {
            let ips = [];

            const defaultGateways = await gateway.getGateway();
            for (let currentGateway of defaultGateways) {
                    let defaultGatewaySplit=currentGateway.split(':');
                    const aliveIps=await gateway.aliveIps(defaultGatewaySplit[1]);
                    ips.push({
                       [defaultGatewaySplit[0]]:aliveIps
                    })
            }

            return ips;
        } catch (error) {
            console.error('Error in getIPs:', error);
            throw error; // Re-throw the error to propagate it to the caller
        }
    }



    


}


module.exports=DiscoverIP
