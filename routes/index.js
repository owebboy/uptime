module.exports = function(io) {
  var express = require('express');
  var router = express.Router();

  var ping = require('ping');
  var hosts = ['webtype.io', 'finance.galleryonthealley.net', 'owebboy.com'];

  io.on('connection', function(socket) {
    hosts.forEach(function (host) {
        ping.promise.probe(host)
          .then(function (res) {
            socket.emit('update', { host: host, res: res });
          });
    });
    setInterval(function() {
      hosts.forEach(function (host) {
          ping.promise.probe(host)
            .then(function (res) {
              socket.emit('update', { host: host, res: res });
            });
      });
    }, 10000);
  });

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'owebboy uptime' });
  });

  /* GET table page. */
  router.get('/table', function(req, res, next) {
    res.render('table', { title: 'owebboy uptime' });
  });

  return router;
}
