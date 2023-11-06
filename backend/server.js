const { WebSocketServer } = require('ws');
const DHT = require('hyperdht');
const { relay } = require('@hyperswarm/dht-relay');
const Stream = require('@hyperswarm/dht-relay/ws');

const dht = new DHT(['node1.hyperdht.org:49737', 'node2.hyperdht.org:49737', 'node3.hyperdht.org:49737'])
const server = new WebSocketServer({ port: 8080 });

server.on('connection', (socket) => {
    console.log("connection req");
    relay(dht, new Stream(false, socket));
});
