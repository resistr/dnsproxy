"use strict";

var host = exports;

const dgram = require('dgram')
const http = require('http')

host.createServer = function (settings) {

    host.port = settings.httpListenerPort;

    host.server = http.createServer((req, res) => {
        if (req.headers['content-type'] === settings.httpContentType && settings.httpMethod === 'POST') {    

            let body;

            req.on('data', chunk => body=chunk);

            req.on('end', () => {
                    let fallback;
                    (function queryns (nameserver, message) {
                    const sock = dgram.createSocket('udp4')

                    sock.send(message, 0, message.length, settings.dnsNameServers[nameserver].port, settings.dnsNameServers[nameserver].address, function () {
                        const nextNameServer = nameserver++;
                        if (nextNameServer < settings.dnsNameServers.length)
                        {
                            fallback = setTimeout(function () {
                                queryns(nextNameServer, message);
                                }, fallbacktimeout);        
                        }
                    });

                    sock.on('message', function (response) {
                        clearTimeout(fallback);
                        if (!res.finished)
                        {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', settings.httpContentType);
                            res.end(response);    
                        }
                        sock.close();
                    });

                    sock.on('error', (e) => console.log({date: Date.now(), error: e}));

                }(0, body));
            });
        } 
    });
};

host.startServer = function () {
    console.log('Host listening on port: ', host.port);
    host.server.listen(host.port);
};
