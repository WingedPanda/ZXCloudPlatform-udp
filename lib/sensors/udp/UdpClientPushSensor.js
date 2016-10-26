import logger from "winston";

import serverSocket from "../../server/udpServer";
import Sensor from "../Sensor";

export default class UdpClientPushSensor extends Sensor
{
    constructor(config)
    {
        super(config);
        this.initMonitor();
    }

    initRouter()
    {
        super.initRouter();
        console.log('invalidate router');
    }

    initMonitor()
    {
        serverSocket.on(`${this.id}:data`, function(e){
            let value = this.format(this.id, e.msg);
            console.log(`sensor-${this.id} recieved data: ${e.msg}, ${JSON.stringify(value)}`);
            this.setValue(value);

        }.bind(this));
    }

    format(sensorId, msg)
    {
        let values;
        let wsdReg = /A\d\d(wd(.*)sd(.*)%)B/;
        let acceReg = /A\d\d(X(.*)Y(.*)Z(.*))B/;
        let result;

        if (sensorId === '01')
        {
            result =  wsdReg.exec(msg);
            values = {"temperature": parseFloat(result[2]), "humidity": parseFloat(result[3])};
        }
        else if (sensorId === '41') {
            result =  acceReg.exec(msg);
            values = {"x": (parseFloat(result[2]))*9.8*100/16328, "y": (parseFloat(result[3]))*9.8*100/16328, "z": (parseFloat(result[4]))*9.8*100/16328}
        }
        else if (sensorId === '42') {
            result =  acceReg.exec(msg);
            values = {"x": (parseFloat(result[2]))*9.8*100/16328, "y": (parseFloat(result[3]))*9.8*100/16328, "z": (parseFloat(result[4]))*9.8*100/16328}
        }        
        return values;
    }
}
