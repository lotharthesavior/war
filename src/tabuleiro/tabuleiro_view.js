
 /**
  * Renderiza o tabuleiro em HTML
  *
  * @class TabuleiroView
  * @constructor
  * @param {Function} tabuleiro Tabuleiro que deve ser renderizado
  */
function TabuleiroView( tabuleiro ){
	this.tabuleiro 			= tabuleiro;
	this.celulaSelecionada 	= false;
}

/**
* Renderiza o tabuleiro no container informado
*
* @method render
* @param {String} container Seletor do container onde deve ser renderizado o tabuleiro
*/
TabuleiroView.prototype.render = function(container) {
	
	// variaveis
	var nomeTabuleiro 		= this.tabuleiro.getNome(),
		linhasTabuleiro 	= this.tabuleiro.getTamanho().linha,
		colunasTabuleiro 	= this.tabuleiro.getTamanho().coluna,
		grade 				= []

		// utilitarios
		contador 	 = 1,
		coluna_atual = '',
		linha_atual	 = '',

		// linhasTabuleiro
		linha = $('<div class="linha"></div>'),

		// colunasTabuleiro
		coluna = $('<div class="coluna celula_desselecionada"></div>');

	// montagem
	for( var i = 1; i <= linhasTabuleiro; i++ ){  // aplica linhasTabuleiro
		linha_atual = linha.clone();
		linha_atual.attr('id','linha_'+i+'_'+nomeTabuleiro);
		grade.push( linha_atual );
	};

	// aplica colunasTabuleiro
	$.each( grade, function( index, value ){ 

		for( i = 1; i <= colunasTabuleiro; i++ ){
			coluna_atual = coluna.clone();
			coluna_atual.attr('id','coluna_'+i+'_linha'+contador+'_'+nomeTabuleiro);
			value.append( coluna_atual );
		}

		contador++;

	});

	$(container).html( grade );
	this.aplicaEventos();
};

/**
* Aplica os eventos necessários
*
* @method aplicaEventos
*/
TabuleiroView.prototype.aplicaEventos = function() {

	var that = this;
	$( '.coluna' ).click(function(){			
		that.desselecionaCelula();
		that.aplicaEstiloParaCelulasAtacaveis();
		that.celulaSelecionada = this;
		$( that.celulaSelecionada ).removeClass('celula_desselecionada');// remove class
		$( that.celulaSelecionada ).addClass('celula_selecionada'); // add class
	});
};

/**
* Desmarca a célula selecionada*
* 
* @method desselecionaCelula
*/
TabuleiroView.prototype.desselecionaCelula = function() {
	$( this.celulaSelecionada ).removeClass('celula_selecionada');// remove class
	$( this.celulaSelecionada ).addClass('celula_desselecionada');// remove class
	this.celulaSelecionada = false;
};

/**
* Aplica o css aos elementos próximos ( fazem fronteira )
* 
* @method aplicaEstiloParaCelulasAtacaveis
*/
TabuleiroView.prototype.aplicaEstiloParaCelulasAtacaveis = function() {};	