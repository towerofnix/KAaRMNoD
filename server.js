const net = require('net')

require('./lib/game/gameInit')({
  dbPath: __dirname + '/db'
}).then(game => {
  const server = new net.Server(socket => game.handleConnection(socket))

  server.listen(8008)
})
