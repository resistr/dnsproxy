"use strict";

const settings = exports;

const fs = require('fs');

settings.settings = {
    role: 'proxy',
    dnsListenerPort: 53,
    dnsFallbackTimeout: 350,
    dnsNameServers: [
        {
            address: '1.1.1.1',
            port: 53
        },
        {
            address: '1.0.0.1',
            port: 53
        }
    ],
    httpListenerPort: 8053,
    httpServer: 'dns.bromleyapps.com',
    httpPort:  443,
    httpContentType: 'application/dns-message',
    httpMethod: 'POST', 
    httpPath: '/'
};

fs.readFile('settings.json', (err, fd) => {
    if (err) {
        console.warn('Can not read settings.json; using default settings.');
    } else {  
        settings.settings = { ...settings.settings, ...JSON.parse(fd) };    
    }
});
