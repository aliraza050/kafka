import * as AWS from "aws-sdk";
import * as AWSLambda from "aws-lambda";
import { Event, Callback, EventHeader, Client } from "putClientProxyModel";
import * as Kafka from 'node-rdkafka';
import * as guid from "uuid/v4";

export function handler(event: Event, context: AWSLambda.Context, callback: Callback) {
    console.log('Kafka create client lambda started');

    console.log(Kafka.features);
    console.log(Kafka.librdkafkaVersion);
    var producer = new Kafka.Producer({
        'metadata.broker.list': 'ec2-13-236-181-89.ap-southeast-2.compute.amazonaws.com:9092'
    }, null);
    producer.connect(null);

    let client: Client = JSON.parse(event.body);
    let clientEvent: EventHeader = {
        tenantId: event.pathParameters.tenantId,
        aggregateId: client.id,
        type: "clientCreated",
        correlationId: guid(),
        client: client
    };

    // Wait for the ready event before proceeding
    producer.on('ready', function() {
        try {
            producer.produce('test', null, new Buffer(JSON.stringify(clientEvent)), null, Date.now());
        } catch (err) {
            console.error('A problem occurred when sending our message');
            console.error(err);
        }
    });

    // Any errors we encounter, including connection errors
    producer.on('event.error', function(err) {
        console.error('Error from producer');
        console.error(err);
    })
    console.log('Kafka create client lambda finished');
}

function createResponse(body: any) {
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