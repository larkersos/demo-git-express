var settings = require('../config/config-db');
var Db = require('mongodb').Db,
    Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

module.exports = new Db(settings.db, new Server(settings.host, settings.port),
    {safe: true});