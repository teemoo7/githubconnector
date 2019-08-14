'use strict';

module.exports.setup = function (app) {
    const bodyParser = require("body-parser");
    const restHelper = require('restler');
    const config = require('config');
    const cards = require('./cards');

    app.use(bodyParser.json());

    app.post('/', (req, res) => {
        let payload = req.body;
        let action = payload.action;
        if (action === 'review_requested') {
            let card = cards.generateReviewRequestedCard(payload);
            if (card) {
                restHelper.postJson(config.get('webHookUrl'), card);
                res.send();
            } else {
                res.status(400).send('Unable to generate card');
            }
        } else {
            res.send('Notification ignored. Action was ' + action);
        }
    });
};
