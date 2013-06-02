
var Turno = {};
var Controle = {};
var Players = ['player1','player2'];
var Tabuleiro1 = {};
var Peca1 = $('<img src=\'img/soldado1.jpg\' class=\'peca imagem_peca\' movimentos=\'2\' />');

head.ready( function(){
	
	// variaveis
	Tabuleiro1.nome = 'tabuleiro1';
	Tabuleiro1.grade = [];
	Tabuleiro1.selecionado = {}; // endereço

	// utilitarios
	var contador = 1;
	var coluna_atual;
	var linha_atual;
	var pecaAtual;

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
					id: 'coluna_'+i+'_linha_'+contador+'_'+Tabuleiro1.nome,
					tipo: 'terra',
					coluna: i,
					linha: contador,
					coordenadas: String(contador)+','+String(i),
					id: 'coluna_'+i+'_linha_'+contador+'_'+Tabuleiro1.nome
				});

			$(coluna_atual).attr({
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
	// RESPONSAVEL PELO MOVIMENTO DAS CELULAS
		// seleção
		$('.coluna_'+Tabuleiro1.nome).click(function(){
			var cumpreRequisitos = true;
			var selecaoAnterior = Tabuleiro1.selecionado;
			Tabuleiro1.selecionado = this;

			// desseleciona se celula selecionada já estiver selecionada
			if( 
				$( Tabuleiro1.selecionado ).hasClass('celula_selecionada') 
			){
				desselecao( Tabuleiro1.selecionado );
				retiraEstiloParaCelulasAtacaveis( Tabuleiro1.selecionado );
				Tabuleiro1.selecionado = {}; // retira o que está selecionado
				cumpreRequisitos = false;
			}

			// celulas de agua
			if(
				$( Tabuleiro1.selecionado ).attr('tipo') == 'agua'
			){
				desselecao( selecaoAnterior );
				retiraEstiloParaCelulasAtacaveis( selecaoAnterior );
				Tabuleiro1.selecionado = {}; // retira o que está selecionado
				cumpreRequisitos = false;	
			}

			// celulas atacaveis
			// 		.movimenta a peca que estiver na casa que estiver mostrando celulas atacaveis
			if( 
				$( Tabuleiro1.selecionado ).hasClass('atacavel') != false // é uma celula atacavel
				&& $( selecaoAnterior ).has('.peca').length // tem 1 peca na selecao anterior
				&& cumpreRequisitos == true // continua cumprindo requisitos
			){ // para celula atacavel (movimentando peca)
				aplicaMovimento( Tabuleiro1.selecionado, selecaoAnterior );
			}

			if( cumpreRequisitos ){
				desselecao( selecaoAnterior );
				retiraEstiloParaCelulasAtacaveis( selecaoAnterior );
				aplicaEstiloParaCelulasAtacaveis( Tabuleiro1.selecionado );

				$( Tabuleiro1.selecionado ).removeClass('celula_desselecionada');// remove class
				$( Tabuleiro1.selecionado ).addClass('celula_selecionada'); // add class
			}
		});
		// desseleção
		function desselecao( celula ){
			$( celula ).removeClass('celula_selecionada');// remove class
			$( celula ).addClass('celula_desselecionada');// remove class
			// Tabuleiro1.selecionado = false;
		}
		// faz movimento de peça
		function aplicaMovimento( novaCasa, casaDaPeca ){
			var peca = $( casaDaPeca ).find('.peca');
			if( parseInt(peca.attr('movimentos')) > 0 ){
				$( novaCasa ).html( peca );
				subtraiUmMovimento( peca );
			}
		}
		// conta 1 movimento de peca
		function subtraiUmMovimento( peca ){
			var novaContagem = parseInt(peca.attr('movimentos')) - 1;
			peca.attr('movimentos', novaContagem );
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
				.attr('tipo','agua');
		});


	// colore amarelo os tabuleiros atacáveis
		// regra desse tabuleiro: 
		// 		1.somente 1 celula adjacente de forma reta é atacavel (mexida da torre do xadrez mas somente 1 casa)
		//		2.somente selecionavel celula de terra
		// 		3.somente atacavel celula de terra
		// 		4.somente selecionável célula vazia
		function aplicaEstiloParaCelulasAtacaveis( celulaSelecionada ){

			if( $(celulaSelecionada).attr('tipo') != 'agua' ){
				// console.log($(celulaSelecionada).attr('tipo'));
				var coluna = parseInt($(celulaSelecionada).attr('coluna'));
				var linha = parseInt($(celulaSelecionada).attr('linha'));

				var peca = $( celulaSelecionada ).find('.peca');
				if( 
					parseInt(peca.attr('movimentos')) > 0 // verifica se peça tem movimentos
					&& Turno.player == peca.attr('player') // verifica se está no turno do dono da peça
				){
				
					// celula acima
						if( 
							(linha-1) > 0  // celula adjacente
							&& $('#coluna_'+coluna+'_linha_'+(linha-1)+'_'+Tabuleiro1.nome).attr('tipo') != 'agua' // celula de terra

						){
							$('#coluna_'+coluna+'_linha_'+(linha-1)+'_'+Tabuleiro1.nome).addClass('atacavel');
						}
					// celula abaixo
						if( 
							(linha+1) > 0  // celula adjacente 
							&& $('#coluna_'+coluna+'_linha_'+(linha+1)+'_'+Tabuleiro1.nome).attr('tipo') != 'agua' // celula de terra 
						){
							$('#coluna_'+coluna+'_linha_'+(linha+1)+'_'+Tabuleiro1.nome).addClass('atacavel');
						}
					// celula direita
						if( 
							(coluna+1) > 0   // celula adjacente
							&& $('#coluna_'+(coluna+1)+'_linha_'+linha+'_'+Tabuleiro1.nome).attr('tipo') != 'agua' // celula de terra
							
						){
							$('#coluna_'+(coluna+1)+'_linha_'+linha+'_'+Tabuleiro1.nome).addClass('atacavel');
						}
					// celula esquerda
						if( 
							(coluna-1) > 0  // celula adjacente 
							&& $('#coluna_'+(coluna-1)+'_linha_'+linha+'_'+Tabuleiro1.nome).attr('tipo') != 'agua' // celula de terra
						){
							$('#coluna_'+coluna+'_linha_'+(linha-1)+'_'+Tabuleiro1.nome).addClass('atacavel');
						}
					// celula abaixo
						if( (linha+1) > 0 && $('#coluna_'+coluna+'_linha_'+(linha+1)+'_'+Tabuleiro1.nome).attr('tipo') != 'agua' ){
							$('#coluna_'+coluna+'_linha_'+(linha+1)+'_'+Tabuleiro1.nome).addClass('atacavel');
						}
					// celula direita
						if( (coluna+1) > 0  && $('#coluna_'+(coluna+1)+'_linha_'+linha+'_'+Tabuleiro1.nome).attr('tipo') != 'agua'){
							$('#coluna_'+(coluna+1)+'_linha_'+linha+'_'+Tabuleiro1.nome).addClass('atacavel');
						}
					// celula esquerda
						if( (coluna-1) > 0 && $('#coluna_'+(coluna-1)+'_linha_'+linha+'_'+Tabuleiro1.nome).attr('tipo') != 'agua' ){
							$('#coluna_'+(coluna-1)+'_linha_'+linha+'_'+Tabuleiro1.nome).addClass('atacavel');
						}
				}
			}
		}
		function retiraEstiloParaCelulasAtacaveis( celulaSelecionada ){
			if( celulaSelecionada != false ){
				var coluna = parseInt($(celulaSelecionada).attr('coluna'));
				var linha = parseInt($(celulaSelecionada).attr('linha'));
				
				// celula acima
					if( (linha-1) > 0 && $('#coluna_'+coluna+'_linha_'+(linha-1)+'_'+Tabuleiro1.nome).attr('tipo') != 'agua' ){
						$('#coluna_'+coluna+'_linha_'+(linha-1)+'_'+Tabuleiro1.nome).removeClass('atacavel');
					}
				// celula abaixo
					if( (linha+1) > 0 && $('#coluna_'+coluna+'_linha_'+(linha+1)+'_'+Tabuleiro1.nome).attr('tipo') != 'agua' ){
						$('#coluna_'+coluna+'_linha_'+(linha+1)+'_'+Tabuleiro1.nome).removeClass('atacavel');
					}
				// celula direita
					if( (coluna+1) > 0 && $('#coluna_'+(coluna+1)+'_linha_'+linha+'_'+Tabuleiro1.nome).attr('tipo') != 'agua' ){
						$('#coluna_'+(coluna+1)+'_linha_'+linha+'_'+Tabuleiro1.nome).removeClass('atacavel');
					}
				// celula esquerda
					if( (coluna-1) > 0 && $('#coluna_'+(coluna-1)+'_linha_'+linha+'_'+Tabuleiro1.nome).attr('tipo') != 'agua' ){
						$('#coluna_'+(coluna-1)+'_linha_'+linha+'_'+Tabuleiro1.nome).removeClass('atacavel');
					}
			}
		}

		// POSICIONA PECA E MOVE COM ELA
		Tabuleiro1.pecas = [];
		pecaAtual = Peca1.clone();
		$( pecaAtual ).attr('coordenadas','2,4');

		function aplicaPecasTabuleiro(){
			$.each( Tabuleiro1.pecas, function( index, value){

				$(value).attr({
					player: 'player1'
				});
				var coordenadasAtual = $(value).attr('coordenadas');
				var tag = 'div[coordenadas="'+coordenadasAtual+'"]';
				$( tag )
					.html( value )
					.attr({
						ocupada: '1'
					});

			});
		}

		Tabuleiro1.pecas.push( pecaAtual );
		aplicaPecasTabuleiro();


		// APLICA CONTROLE
			// console.log(Controle.html);
			Controle.html = '<ul>'
			Controle.html += '<li><a style=\'cursor:pointer\' onclick=\'javascript:Controle.passarTurno()\'>Passar Turno</a></li>';
			Controle.html += '</ul>';
			$('#controle').html( Controle.html );

			if( Turno.player == undefined ){ // aplica primeiro turno
				Turno.player = Players[0]; 
				$('#turno').val(Turno.player);
			}

			// opcoes do controle
			Controle.passarTurno = function(){
				if( 
					Turno.player == Players[0] 
				){
					Turno.player = Players[1];
				}else{
					Turno.player = Players[0];
				}
				renovaMovimentosPecasPlayer();
				$('#turno').val(Turno.player);
			}
			function renovaMovimentosPecasPlayer(){
				$.each( Tabuleiro1.pecas, function( index, value ){
					if( value.attr('player') == Turno.player ){
						value.attr({
							movimentos: Peca1.attr('movimentos')
						});
					}
				});
			}


});

