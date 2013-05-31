
function WarGame() {
	this.jogadores = [];
}

WarGame.prototype.adicionaJogador = function(socket) {
	this.jogadores.push(socket);
};


WarGame.prototype.notificaJogadores = function( evento, dados ) {

	var tamanho = this.jogadores.length,
		indice;

	for( indice = 0; indice < tamanho; indice++ ) {
		this.jogadores[indice].emit(evento, dados);
	}
};

module.exports = function () {
    return new WarGame();
};