
function TabuleiroView( tabuleiro ){

	this.tabuleiro = tabuleiro;

}

TabuleiroView.prototype.render = function() {
	//faz o que devia ser feito

	// variaveis
	var nome = 'tabuleiro1';

	//
	var contador = 1;

	// variaveis
	// linhas
	var linhas = 10;
	var linha = $('<div class="linha_'+nome+'" style="float:left;"></div>');
	// colunas
	var colunas = 10;
	var coluna = '';

	// montagem
	for( var i = 1; i < linhas; i++ ){  // aplica linhas

		var linha_atual = linha;
		$(linha_atual).attr('id','linha_'+i+'_'+nome);
		$('#tabuleiro').append( linha_atual );

	};

	$('#tabuleiro').html( estrutura );
	$.each( $('.linha_'+nome),function( index, value ){ // aplica colunas

		$.each( linhas, function( index, value ){
			$('#tabuleiro').append( value );
	//TODO: outro loop aqui dentro para as colunas de cada linha
	var coluna_atual = coluna;
	$(coluna_atual).attr('id','coluna_'+contador+'_'+nome);
	$( '#linha'+contador+'_'+nome ).append( coluna_atual );
	contador++;

};

		