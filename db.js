"use strict";
const db_config = require('./config.json').db;
const pg = require('pg-promise')();
const connection = pg(db_config);

const cs = new pg.helpers.ColumnSet(['value', 'count'], {table: 'tokens'});

function saveTokens(values) {
    return new Promise((resolve, reject) => {
        if (values.length) {
            const query = pg.helpers.insert(values, cs)
               + 'on conflict(value) do update set count = excluded.count + tokens.count';
            resolve(connection.none(query));
        } else {
            resolve();
        }
    })
}

module.exports = {saveTokens};