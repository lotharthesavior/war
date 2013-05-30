
var selecionado;

head.ready( function(){
	
	// variaveis
	var nome = 'tabuleiro1';
	var grade = [];
	selecionado = {}; // endereço

	// utilitarios
	var contador = 1;
	var coluna_atual;
	var linha_atual;

	// variaveis
	// linhas
	var linhas = 11;
	var linha = $('<div class="linha_'+nome+'" style="clear:both;with:700px;height:50px;margin:0px;padding:0px;background:green;"></div>');
	
	// colunas
	var colunas = 11;
	var coluna = $('<div class="coluna_'+nome+' celula_desselecionada" style=""></div>');

	// montagem
	for( var i = 1; i < linhas; i++ ){  // aplica linhas

		linha_atual = linha.clone();
		$(linha_atual).attr('id','linha_'+i+'_'+nome);
		grade.push( linha_atual );
		// $('#tabuleiro').append( linha_atual );

	};

	// aplica colunas
	$.each( grade, function( index, value ){ 

		for( i = 1; i < colunas; i++ ){

			coluna_atual = coluna.clone();
			$(coluna_atual).attr('id','coluna_'+i+'_linha'+contador+'_'+nome);

			value.append( coluna_atual );

		}

		contador++;

	});

	// aplica
	$('#tabuleiro').html( grade );


	// eventos para as células
		// seleção
		$('.coluna_'+nome).click(function(){
			
			desselecao( this );
			aplicaEstiloParaCelulasAtacaveis( this );

			selecionado = this;
			$(selecionado).removeClass('celula_desselecionada');// remove class
			$(this).addClass('celula_selecionada'); // add class

		});
		// desseleção
		function desselecao( celula ){
			
			$(selecionado).removeClass('celula_selecionada');// remove class
			$(selecionado).addClass('celula_desselecionada');// remove class
			selecionado = false;

		}

	// colore amarelo os tabuleiros atacáveis
		function aplicaEstiloParaCelulasAtacaveis(){
			//TODO:
		}

});

