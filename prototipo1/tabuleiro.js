
var Tabuleiro1 = {};

head.ready( function(){
	
	// variaveis
	Tabuleiro1.nome = 'tabuleiro1';
	Tabuleiro1.grade = [];
	Tabuleiro1.selecionado = {}; // endereço

	// utilitarios
	var contador = 1;
	var coluna_atual;
	var linha_atual;

	// variaveis
	// linhas
	Tabuleiro1.linhas = 11;
	Tabuleiro1.linha = $('<div class="linha_'+Tabuleiro1.nome+'"></div>');
	
	// colunas
	Tabuleiro1.colunas = 11;
	Tabuleiro1.coluna = $('<div class="coluna_'+Tabuleiro1.nome+' celula_desselecionada" style=""></div>');

	// montagem
		// aplica linhas
		for( var i = 1; i < Tabuleiro1.linhas; i++ ){

			linha_atual = Tabuleiro1.linha.clone();
			$(linha_atual).attr('id','linha_'+i+'_'+Tabuleiro1.nome);
			Tabuleiro1.grade.push( linha_atual );

		};

	// aplica colunas
	$.each( Tabuleiro1.grade, function( index, value ){ 

		for( i = 1; i < Tabuleiro1.colunas; i++ ){

			coluna_atual = Tabuleiro1.coluna.clone();

			$(coluna_atual)
				.attr({
					id: 'coluna_'+i+'_linha_'+contador+'_'+Tabuleiro1.nome
				});

			$(coluna_atual).data({
				tipo: 'terra',
				coluna: i,
				linha: contador

			});

			value.append( coluna_atual );

		}

		contador++;

	});

	// aplica
	$('#tabuleiro').html( Tabuleiro1.grade );


	// eventos para as células
		// seleção
		$('.coluna_'+Tabuleiro1.nome).click(function(){
			
			if( $(this).data('tipo') != 'agua' ){
				desselecao( this );
				retiraEstiloParaCelulasAtacaveis( Tabuleiro1.selecionado );
				aplicaEstiloParaCelulasAtacaveis( this );

				Tabuleiro1.selecionado = this;
				$(Tabuleiro1.selecionado).removeClass('celula_desselecionada');// remove class
				$(this).addClass('celula_selecionada'); // add class
			}

		});
		// desseleção
		function desselecao( celula ){
			
			$(Tabuleiro1.selecionado).removeClass('celula_selecionada');// remove class
			$(Tabuleiro1.selecionado).addClass('celula_desselecionada');// remove class
			// Tabuleiro1.selecionado = false;

		}

	// apica agua em algumas celulas
		Tabuleiro1.agua = [ 
			[1,2],
			[2,2],
			[2,3],
			[3,3],
			[4,3],
			[5,3],
			[5,4],
			[6,4],
			[6,5],
			[7,5],
			[7,6],
			[8,6],
			[9,6],
			[10,6],
			[1,9],
			[1,10],
			[2,10]
		];
		$.each( Tabuleiro1.agua, function( index, value ){
			$('#coluna_'+value[1]+'_linha_'+value[0]+'_'+Tabuleiro1.nome)
				.css('background','blue')
				.data('tipo','agua');
		});


	// colore amarelo os tabuleiros atacáveis
		// regra desse tabuleiro: 
		// 		1.somente 1 celula adjacente de forma reta é atacavel (mexida da torre do xadrez mas somente 1 casa)
		//		2.somente selecionavel celula de terra
		// 		3.somente atacavel celula de terra
		function aplicaEstiloParaCelulasAtacaveis( celulaSelecionada ){

			if( $(celulaSelecionada).data('tipo') != 'agua' ){
				// console.log($(celulaSelecionada).data('tipo'));
				var coluna = parseInt($(celulaSelecionada).data('coluna'));
				var linha = parseInt($(celulaSelecionada).data('linha'));
				
				// celula acima
					if( (linha-1) > 0 && $('#coluna_'+coluna+'_linha_'+(linha-1)+'_'+Tabuleiro1.nome).data('tipo') != 'agua' ){
						$('#coluna_'+coluna+'_linha_'+(linha-1)+'_'+Tabuleiro1.nome).addClass('atacavel');
					}
				// celula abaixo
					if( (linha+1) > 0 && $('#coluna_'+coluna+'_linha_'+(linha+1)+'_'+Tabuleiro1.nome).data('tipo') != 'agua' ){
						$('#coluna_'+coluna+'_linha_'+(linha+1)+'_'+Tabuleiro1.nome).addClass('atacavel');
					}
				// celula direita
					if( (coluna+1) > 0  && $('#coluna_'+(coluna+1)+'_linha_'+linha+'_'+Tabuleiro1.nome).data('tipo') != 'agua'){
						$('#coluna_'+(coluna+1)+'_linha_'+linha+'_'+Tabuleiro1.nome).addClass('atacavel');
					}
				// celula esquerda
					if( (coluna-1) > 0 && $('#coluna_'+(coluna-1)+'_linha_'+linha+'_'+Tabuleiro1.nome).data('tipo') != 'agua' ){
						$('#coluna_'+(coluna-1)+'_linha_'+linha+'_'+Tabuleiro1.nome).addClass('atacavel');
					}
			}
		}
		function retiraEstiloParaCelulasAtacaveis( celulaSelecionada ){
			if( celulaSelecionada != false ){
				var coluna = parseInt($(celulaSelecionada).data('coluna'));
				var linha = parseInt($(celulaSelecionada).data('linha'));
				
				// celula acima
					if( (linha-1) > 0 && $('#coluna_'+coluna+'_linha_'+(linha-1)+'_'+Tabuleiro1.nome).data('tipo') != 'agua' ){
						$('#coluna_'+coluna+'_linha_'+(linha-1)+'_'+Tabuleiro1.nome).removeClass('atacavel');
					}
				// celula abaixo
					if( (linha+1) > 0 && $('#coluna_'+coluna+'_linha_'+(linha+1)+'_'+Tabuleiro1.nome).data('tipo') != 'agua' ){
						$('#coluna_'+coluna+'_linha_'+(linha+1)+'_'+Tabuleiro1.nome).removeClass('atacavel');
					}
				// celula direita
					if( (coluna+1) > 0 && $('#coluna_'+(coluna+1)+'_linha_'+linha+'_'+Tabuleiro1.nome).data('tipo') != 'agua' ){
						$('#coluna_'+(coluna+1)+'_linha_'+linha+'_'+Tabuleiro1.nome).removeClass('atacavel');
					}
				// celula esquerda
					if( (coluna-1) > 0 && $('#coluna_'+(coluna-1)+'_linha_'+linha+'_'+Tabuleiro1.nome).data('tipo') != 'agua' ){
						$('#coluna_'+(coluna-1)+'_linha_'+linha+'_'+Tabuleiro1.nome).removeClass('atacavel');
					}
			}
		}

});

