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
        p_callback(null, JSON.stringify(msg.toString()));
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
