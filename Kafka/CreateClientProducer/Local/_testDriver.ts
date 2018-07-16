import * as fs from 'fs';
import * as app from '../putClient';
import * as Awslambda from 'aws-lambda';

let event = JSON.parse(fs.readFileSync('./Local/_sampleEvent.json', 'utf8').trim());

let context; //AWSLambda.Context;

app.handler(event, context, function (err, data) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Lambda Complete');
    }
});