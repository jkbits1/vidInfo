/**
 * Created by jk on 26/12/15.
 */


var Hapi = require('hapi');
var server = new Hapi.Server();

var getVideoInfoFns = require('./vidDiscover');

var getVideoInfo            = getVideoInfoFns.getVideoInfo;
var getVideoInfoWrapped     = getVideoInfoFns.getVideoInfoWrapped;
var getVideoInfoFileNames   = getVideoInfoFns.getVideoInfoFileNames;

var port = +(process.argv[2] || 8080);

console.log("port: ", port)

server.connection({
  // host: 'localhost',
  host: '0.0.0.0',
  port: port,
  routes: {
    cors: true
  }
});
//  { cors: true }
// cors: {
       // headers: ["Accept", "Authorization", "Content-Type", "If-None-Match", "Accept-language"]
    // }

//server.connection({ });

server.route({
  path: '/vidInfo',
  method: 'GET',
  handler: getVidInfo
});

server.route({
  path: '/vidInfoWrapped/{fileName}',
  method: 'GET',
  handler: getVidInfoWrapped
});

server.route({
  path: '/vidInfo/{fileName}',
  method: 'GET',
  handler: getVidInfo
});

server.route({
  path: '/vidInfo/files',
  method: 'GET',
  handler: getVidInfoFileNames
});

server.start(function () {
  console.log('server live:', server.info.uri);
});

function getVidInfo (req, reply) {
  var fileName = req.params.fileName || 'dsk6-info.txt';

  console.log(fileName);

  getVideoInfo(fileName, reply);
}

function getVidInfoWrapped (req, reply) {
  var fileName = req.params.fileName || 'dsk6-info.txt';

  console.log(`params: ${req.params.fileName}`);
  console.log(fileName);

  getVideoInfoWrapped(fileName, reply);
}

function getVidInfoFileNames (req, reply) {
  // var fileName = req.params.fileName || 'dsk6-info.txt';

  console.log("getVidInfoFileNames");

  getVideoInfoFileNames(reply);
}
