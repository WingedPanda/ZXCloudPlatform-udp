import logger from "winston";
import dgram from "dgram";

import app from "../../server/app";
import Sensor from "../Sensor";

export default class UDPReceive extends Sensor
{
    constructor(p_config)
    {
        super(p_config);

        udpconnect((err, res) =>
        {
            if (!err)
            {
                this.setValue(res);
            }
        });
    }
}

function udpconnect(p_callback)
{
    let serverSocket = null;
    serverSocket = dgram.createSocket('udp4');

    serverSocket.on('message', function (msg)
    {
/*         p_callback(null, JSON.stringify(msg.toString())); */
        let msgstring = JSON.stringify(msg.toString());
        let msgstring1 = msgstring.split("");
        if ( msgstring1[2] == "0" && msgstring1[3] == "1" )
        {
            let temperature_value_arr = msgstring1.slice(6,11);
            let humidity_value_arr = msgstring1.slice(13,18);
            let temperature_value = temperature_value_arr.join("");
            let humidity_value = humidity_value_arr.join("");
            let temperature_value1 = parseFloat(temperature_value);
            let humidity_value1 = parseFloat(humidity_value);
            let sensorwd = new Object(); 
            sensorwd.temperature = temperature_value1;
            sensorwd.humidity = humidity_value1;             
            p_callback(null, sensorwd);
        }
        else if (msgstring1[2] == "4" && msgstring1[3] == "2")
        
        console.log('recv %s(%d bytes) ', msg, msg.length);
    });

    serverSocket.on('error', function (err)
    {
        p_callback(err);
        console.log('error, msg - %s, stack - %s', err.message, err.stack);
    });

    serverSocket.on('listening', function ()
    {
        console.log('echo server is listening on port 5683.');
    })

    serverSocket.bind(5683);
}
