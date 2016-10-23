export default [
    {
        id: "01", // sensor-instance-id eg: 01
        name: "sensor-01",
        desc: "A DHT11 sensor in my living room connected with WiFi via ESP8266, powered by USB connector.",
        meta: {
            model: {
                name: "DHT11",
                manufacturer: "Shenzhen Ruishengweiye Electronic Co., Ltd."
            },
            values: {
                temperature: {
                    type: "double",
                    unit: "degree Celsius"
                },
                humidity: {
                    type: "double",
                    unit: "percentage"
                }
            }
        },
        monitor: {
            interval: 60 * 1000,
            mode: "udp-client-push",
        },
        storage: {
            collection: {
                name: "sensor-01" // 'sensor' + sensor instance id
            }
        }
    },
    {
        "id" : "42",
        "name" : "sensor-42",
        "desc" : "采集加速度值信息，工作范围：±16g",
        "meta" : {
            "model" : {
                "name" : "MPU6050",
                "manufacturer" : "InvenSense"
            },
            "values" : {
                "x" : {
                    "type" : "double",
                    "unit" : "Gravitational acceleration"
                },
                "y" : {
                    "type" : "double",
                    "unit" : "Gravitational acceleration"
                },
                "z" : {
                    "type" : "double",
                    "unit" : "Gravitational acceleration"
                }
            }
        },
        "monitor" : {
            "interval" : 1 * 1000,
            "mode": "udp-client-push",
        },
        "storage" : {
            "collection" : {
                "name" : "sensor-42"
            }
        }
      }
];
