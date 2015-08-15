var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , wargame = require('./src/wargame');

app.listen(8080);

var war = wargame();

function handler ( request, response ) {
  response.writeHead(200);
  response.end("dados");
}

io.sockets.on('connection', function (jogador) {


	war.adicionaJogador(jogador);

	jogador.emit('boas-vindas', { msg: 'Seja bem vindo' });	

  	jogador.on('celula-selecionada', function(dados){
  		war.notificaJogadores('celula-selecionada', dados);
  	});

});