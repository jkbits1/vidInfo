/**
 * Created by jk on 26/12/15.
 */


var Hapi = require('hapi');
var server = new Hapi.Server();

var getVideoInfo = require('./vidDiscover');

var port = +(process.argv[2] || 8080);

server.connection({
  host: 'localhost',
  port: port
});

server.route({
  path: '/vidInfo',
  method: 'GET',
  handler: getVidInfo
});

server.route({
  path: '/vidInfo/{fileName}',
  method: 'GET',
  handler: getVidInfo
});

server.start(function () {
  console.log('server live:', server.info.uri);
});

function getVidInfo (req, reply) {
  var fileName = req.params.fileName || 'dsk6-info.txt';

  console.log(fileName);

  getVideoInfo(fileName, reply);
}