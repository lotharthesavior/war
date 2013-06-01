 /**
  * Armazena as informações referentes ao tabuleiro
  *
  * @class Tabuleiro
  * @constructor
  * @param {String} nome Nome do argumento
  * @param {Object} tamanho Objeto contendo as propriedades de linha e coluna
  */
function Tabuleiro(nome, tamanho){
	this.nome        = nome;
	this.tamanho     = tamanho;
  this.territorios = {};
}

Tabuleiro.prototype.adicionarTerritorio = function( nome, posicao ) {
  this.territorios[nome] = posicao;  
};

/**
* Retorna o nome do tabuleiro
*
* @method getNome
* @return {String} Retorna o nome do tabuleiro
*/
Tabuleiro.prototype.getNome = function() {
	return this.nome;	
};


/**
* Retorna o tamanho do tabuleiro
*
* @method getTamanho
* @return {String} Retorna o tamanho do tabuleiro
*/
Tabuleiro.prototype.getTamanho = function() {
	return this.tamanho;
};

/**
* Retorna os territórios existentes no tabuleiro
*
* @method getTerritorios
* @return {Array} Retorna a lista de territórios existentes
*/
Tabuleiro.prototype.getTerritorios = function() {
  return this.territorios;
};