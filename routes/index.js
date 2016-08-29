module.exports = function(io) {
  var express = require('express');
  var router = express.Router();

  const ping = require('node-http-ping');

  var hosts = ['webtype.io', 'finance.galleryonthealley.net', 'owebboy.com'];

  io.on('connection', function(socket) {
    socket.on('connected', function(data) {
      hosts.forEach(function (host) {
        ping(host, 80)
          .then(time => socket.emit('update', { host: host, time: time }))
          .catch(error => socket.emit('update', { host: host, err: err }));
      });
      setInterval(function() {
        hosts.forEach(function (host) {
        ping(host, 80)
          .then(time => socket.emit('update', { host: host, time: time }))
          .catch(error => socket.emit('update', { host: host, err: err }));
        });
      }, 60000);
    });
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
