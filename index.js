"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const config = require('./config.json');
const saveTokens =  require('./db').saveTokens;
const app = express();
app.use(bodyParser.json());

const delimiters = /[ _+-.,!@#$%^&*();\/|<>"'\t:\n]/;



function getTokens(text) {
    const result = {};
    text.split(delimiters)
        .forEach((element, index) => {
            element = element.trim()
            if(element) {
                if(result[element]) {
                    result[element]++;
                } else {
                    result[element] = 1;
                }
            }
        });
    return Object.keys(result).map(k => {
        return {value : k, count : result[k]};
    });
}

app.post('/tokens', (req, res) => {
    const {text} = req.body;
    if(!text) return res.status(400).end('Empty text!');
    const tokens = getTokens(text);
    saveTokens(tokens)
        .then(() => {
            return res.status(200).end();
        })
        .catch(err => res.status(500).end(err.toString()));
});





app.listen(config.PORT, function(err) {
    if(err) console.error(err);
    console.log(`tokenizer listening on port ${config.PORT}`);
    const options = {
        url : `${config.MASTER_URI}/register/tokenizer`,
        headers: {
            'x-port' : config.PORT
        }
    };
    request(options, function (err, response, body) {
        if(err) {
            console.error('error connecting to master');
            console.error(err);
            return;
        }
        console.log('connected to master')

    });
});