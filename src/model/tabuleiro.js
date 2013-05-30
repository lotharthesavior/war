 /**
  * Armazena as informações referentes ao tabuleiro
  *
  * @class Tabuleiro
  * @constructor
  * @param {String} nome Nome do argumento
  * @param {Object} tamanho Objeto contendo as propriedades de linha e coluna
  */
function Tabuleiro(nome, tamanho){
	this.nome = nome;
	this.tamanho = tamanho;
}

/**
* Retorna o nome do tabuleiro
*
* @method getNome
* @return {Strine} Retorna o nome do tabuleiro
*/
Tabuleiro.prototype.getNome = function() {
	return this.nome;	
};


/**
* Retorna o tamanho do tabuleiro
*
* @method getTamanho
* @return {Strine} Retorna o tamanho do tabuleiro
*/
Tabuleiro.prototype.getTamanho = function() {
	return this.tamanho;
};

