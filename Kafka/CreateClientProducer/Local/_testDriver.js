"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const app = require("../putClient");
let event = JSON.parse(fs.readFileSync('./Local/_sampleEvent.json', 'utf8').trim());
let context;
app.handler(event, context, function (err, data) {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Lambda Complete');
    }
});
//# sourceMappingURL=_testDriver.js.map