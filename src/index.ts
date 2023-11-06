const ping = require('ping')
const getGateway = require('./gateway')

export abstract class  DiscoverIP {


    protected async getIPs(): Promise<string[]>{

        let ips: Array<string> = [];

        const defaultGateway = await getGateway()

        console.log("Default Gateway:", defaultGateway);
        const dg_array:string[] = (defaultGateway as string).split('.');
        console.log(typeof dg_array[0], dg_array[1].length, dg_array[2].length)
        let ip:string = `${dg_array[0]}.${dg_array[1]}.${dg_array[2]}`
        let promises:Promise<number>[] = []

        for (let port = 2; port < 255; port++) {

            promises.push(ping.promise.probe(
                `${ip}.${port}`
            )
                .then(async function (res: any) {


                    const data = res?.output?.search(/Request timed out/i)

                    if (res.alive || data >= 0) {
                        ips.push(res.host)

                    } else {
                        // console.log('not alive',res.host)
                    }
                })
            )
        }

        await Promise.all(promises)
        return ips
    }

}




// DiscoverIP.getIPs()
// .then((ips)=>{
//     console.log(ips)
// })
