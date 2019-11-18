"use strict";

const dgram = require('dgram')
const http = require('https')

var proxy = exports;


proxy.createServer = function (settings) {

    proxy.port = settings.dnsListenerPort;
    proxy.server = dgram.createSocket('udp4');

    proxy.server.on('message', function (message, rinfo) {
        const httpOptions = {
            hostname: settings.httpServer,
            port: settings.httpPort,
            path: settings.httpPath,
            method: settings.httpMethod,
            headers: {
                'Content-Type': contenttype,
                'Content-Length': message.length
            }
        };
    
        const req = http.request(httpOptions, (res) => {
            res.on('data', (d) => proxy.server.send(d, 0, d.length, rinfo.port, rinfo.address));
            res.on('error', (e) => console.error({date: Date.now(), error: e}));
        });
        req.on('error', (e) => console.error({date: Date.now(), error: e}));

        req.write(message);
        req.end();
    });

    proxy.server.on('error', (e) => console.error({date: Date.now(), error: e}));
};

proxy.startServer = function () {
    console.log('Proxy listening on port: ', proxy.port);
    proxy.server.bind(proxy.port);
};
