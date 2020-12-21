'use strict';
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');
admin.initializeApp();

exports.report = functions.https.onRequest(async (req: any, res: any) => {
    if (req.method !== 'POST') {
        res.send(405, 'HTTP Method ' + req.method + ' not allowed');
        return;
    }

    await cors(req, res, async () => {
        // Grab the text parameter.
        const report = JSON.parse(req.body);
    
        // Push the new message into Cloud Firestore using the Firebase Admin SDK.
        await admin.firestore().collection('reports').add(report);
    
        // Send back a message that we've successfully written the message
        res.json(report);
    })
});
