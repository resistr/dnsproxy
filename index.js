"use strict";

const settings = require('./settings');
const server = require('./'+settings.settings.role);
server.createServer(settings.settings);
server.startServer();
