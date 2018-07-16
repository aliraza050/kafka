"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Kafka = require("node-rdkafka");
const guid = require("uuid/v4");
function handler(event, context, callback) {
    console.log('Kafka create client lambda started');
    console.log(Kafka.features);
    console.log(Kafka.librdkafkaVersion);
    var producer = new Kafka.Producer({
        'metadata.broker.list': 'ec2-13-236-181-89.ap-southeast-2.compute.amazonaws.com:9092'
    }, null);
    producer.connect(null);
    let client = JSON.parse(event.body);
    let clientEvent = {
        tenantId: event.pathParameters.tenantId,
        aggregateId: client.id,
        type: "clientCreated",
        correlationId: guid(),
        client: client
    };
    producer.on('ready', function () {
        try {
            producer.produce('test', null, new Buffer(JSON.stringify(clientEvent)), null, Date.now());
        }
        catch (err) {
            console.error('A problem occurred when sending our message');
            console.error(err);
        }
    });
    producer.on('event.error', function (err) {
        console.error('Error from producer');
        console.error(err);
    });
    console.log('Kafka create client lambda finished');
}
exports.handler = handler;
function createResponse(body) {
    let response = {
        statusCode: 200,
        body: JSON.stringify(body),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        }
    };
    return response;
}
//# sourceMappingURL=putClient.js.map