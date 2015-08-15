
 /**
  * Renderiza o tabuleiro em HTML
  *
  * @class TabuleiroView
  * @constructor
  * @param {Function} tabuleiro Tabuleiro que deve ser renderizado
  */
function TabuleiroView() {
	this.celulaSelecionada = false;	
}

TabuleiroView.prototype.setTabuleiro = function(tabuleiro) 
{
	this.tabuleiro 			= tabuleiro;
};

TabuleiroView.prototype.aplicaEventoSocket = function() 
{
	var that = this;

	this.socket.on('celula-selecionada', function(posicao){
		that.selecionaCelula( $( '#'+ posicao.linha +'_'+ posicao.coluna ) );
	});
};

/**
* Renderiza o tabuleiro no container informado
*
* @method render
* @param {String} container Seletor do container onde deve ser renderizado o tabuleiro
*/
TabuleiroView.prototype.render = function(container) {
	
	var grade = this.criarGrade();

	this.adicionaTerritoriosNaGrade(grade);

	$(container).html( grade );	
	this.aplicaEventos();

};

TabuleiroView.prototype.adicionaTerritoriosNaGrade = function(grade) {
	
	var territorios = this.tabuleiro.getTerritorios(), 
		qtdCelulasTerritorio = 0, 
		ctCelulaTerritorio	 = 0,
		posicao				 = [];

	for( nomeTerritorio in territorios ) {
		qtdCelulasTerritorio = territorios[nomeTerritorio].length;

		for( ctCelulaTerritorio = 0; ctCelulaTerritorio < qtdCelulasTerritorio; ctCelulaTerritorio++ ) {
			posicao = territorios[nomeTerritorio][ctCelulaTerritorio];		
			$( grade ).find('#'+ posicao[0] +'_'+ posicao[1]).addClass('terra');
		}
	}
};

TabuleiroView.prototype.criarGrade = function() {

	// variaveis
	var nomeTabuleiro 		= this.tabuleiro.getNome(),
		linhasTabuleiro 	= this.tabuleiro.getTamanho().linha,
		colunasTabuleiro 	= this.tabuleiro.getTamanho().coluna,
		grade 			= $('<div />'),

		// utilitarios
		contador 	= 1,
		coluna_atual 	= '',
		linha_atual	= '',

		// linhasTabuleiro
		linha = $('<div />'),
	
		// colunasTabuleiro
		coluna = $('<div />');

	// montagem
	for( var i = 1; i <= linhasTabuleiro; i++ ){  // aplica linhasTabuleiro
		linha_atual = linha.clone();
		linha_atual.attr('id','linha_'+i+'_'+nomeTabuleiro);
		linha_atual.addClass('linha');
		linha_atual.data({
			id_linha: i
		});
		grade.append( linha_atual );
	};

	// aplica colunasTabuleiro
	$.each( grade.find('div.linha'), function( index, value ){ 

		for( i = 1; i <= colunasTabuleiro; i++ ){
			coluna_atual = coluna.clone();
			coluna_atual.addClass('coluna celula_desselecionada');
			coluna_atual.attr('id', contador +'_'+ i );
			coluna_atual.data({
				tipo: 'agua',
				coluna: i,
				linha: contador,
				id_celula: String(index+1)+','+String(i),
				id_coluna: i
			});
			$(value).append( coluna_atual );
		}

		contador++;

	});

	return grade;
};

/**
* Aplica os eventos necessários
*
* @method aplicaEventos
*/
TabuleiroView.prototype.aplicaEventos = function() {

	var that = this;
	$( '.coluna' ).click(function(){

		var dadosLinhaColuna = $(this).attr('id').split('_');		

		that.aplicaEstiloParaCelulasAtacaveis();
		that.selecionaCelula(this);
		
		//that.socket.emit('celula-selecionada', { linha : dadosLinhaColuna[0], coluna : dadosLinhaColuna[1] });
	});
};

/**
* Seleciona uma célula
* 
* @method selecionaCelula
*/
TabuleiroView.prototype.selecionaCelula = function( celula ) {
	this.desselecionaCelula();
	$( celula ).addClass('celula_selecionada');// remove class
	$( celula ).removeClass('celula_desselecionada');// remove class
	this.celulaSelecionada = celula;
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
