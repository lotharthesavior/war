var app = app || {};

app.TabuleiroView = Backbone.View.extend({

	pecas : [],

	initialize: function() {
		this.$linha 			= $('<div class="linha"></div>');
		this.$coluna 			= $('<div class="coluna celula_desselecionada"></div>');
		this.$peca 				= $('<img src=\'img/soldado1.jpg\' class=\'peca imagem_peca\' movimentos=\'2\' />');
		this.$celulaSelecionada = false;

		var pecaAtual1 = this.$peca.clone();
		$( pecaAtual1 ).attr({
			coordenadas: '2,4',
			player: 'player1'
		});
		this.pecas.push( pecaAtual1 );

		
		var pecaAtual2 = this.$peca.clone();
		$( pecaAtual2 ).attr({
			coordenadas: '3,6',
			player: 'player2'
		});

		this.pecas.push( pecaAtual2 );

		this.aplicaPecasTabuleiro();
	},

	events : {
		'click div.coluna' : 'selecionaCelula'
	},

	selecionaCelula : function( event ) {
		var cumpreRequisitos 	= true,
			selecaoAnterior 	= this.$celulaSelecionada;

		this.$celulaSelecionada = $( event.target );
		
		if( this.$celulaSelecionada.attr('tipo') == 'agua' ){
			this.desselecao( selecaoAnterior );
			//retiraEstiloParaCelulasAtacaveis( selecaoAnterior );
			this.$celulaSelecionada = false; 
			cumpreRequisitos 		= false;	
		}

		if( this.$celulaSelecionada.hasClass('atacavel') != false 
			&& $( selecaoAnterior ).has('.peca').length 
			&& cumpreRequisitos == true ) { 
			this.aplicaMovimento( this.$celulaSelecionada, selecaoAnterior );
		}
		
		if( this.$celulaSelecionada.is( selecaoAnterior )  ){			
			this.desselecao( this.$celulaSelecionada );
			//retiraEstiloParaCelulasAtacaveis( this.$celulaSelecionada );
			this.$celulaSelecionada = false; 
			cumpreRequisitos 		= false;
		}

		if( cumpreRequisitos ){
			this.desselecao( selecaoAnterior );
			//retiraEstiloParaCelulasAtacaveis( selecaoAnterior );
			this.aplicaEstiloParaCelulasAtacaveis( this.$celulaSelecionada );		

			this.$celulaSelecionada.removeClass('celula_desselecionada');
			this.$celulaSelecionada.addClass('celula_selecionada'); 
		}
	},

	aplicaPecasTabuleiro : function (){

		var coordenadasAtual,
			tag;

		$.each( this.pecas, function( index, value){

			coordenadasAtual = $(value).attr('coordenadas');
			tag = 'div[coordenadas="'+coordenadasAtual+'"]';

			$( tag ).html( value )
					.attr({
						ocupada: '1'
					});
		});
	},

	desselecao : function( $celula ) {
		if($celula) {
			$celula.removeClass('celula_selecionada');
			$celula.addClass('celula_desselecionada');			
		}
	},

	aplicaMovimento : function(novaCasa, casaDaPeca) {
		var peca = $( casaDaPeca ).find('.peca');
		var flagMovimento = 0;

		if( parseInt(peca.attr('movimentos'), 10) > 0 // impede quando movimentos restantes está zerado
			&& $( novaCasa ).find('.peca').length < 1 // impede movimento para peca já ocupada por 1 peça
		){
			$( novaCasa ).html( peca );
			this.subtraiUmMovimento( peca );
			flagMovimento = 1; // para evitar ataque caso movimento aconteça tranquilo
		}

		// trata ataque
		if( $( novaCasa ).find('.peca').length > 0 // casa ocupada por outra peça 
			&& flagMovimento == 0 // evita ataque desnecesário
		){
			if(
				this.verificaAtaque( novaCasa, casaDaPeca ) // verifica se peca que ocupa casa antes é inimigo
			){

			}
		}
	},

	// conta 1 movimento de peca
	subtraiUmMovimento : function( peca ){
		var novaContagem = parseInt(peca.attr('movimentos'), 10) - 1;
		peca.attr('movimentos', novaContagem );
	},
	// verifica se peca previamente colocada na casa é inimigo
	verificaAtaque : function ( novaCasa, casaDaPeca ){
		var playerNovaCasa = $( novaCasa ).find('.peca').attr('player');
		var playerPecaAtual = $( casaDaPeca ).find('.peca').attr('player');
		if( playerNovaCasa != playerPecaAtual ){ // ataque
			this.subtraiUmMovimento( $( casaDaPeca ).find('.peca') ); // ataque consome 1 movimento
		}
	},

	// colore amarelo os tabuleiros atacáveis
	// regra desse tabuleiro: 
	// 		1.somente 1 celula adjacente de forma reta é atacavel (mexida da torre do xadrez mas somente 1 casa)
	//		2.somente selecionavel celula de terra
	// 		3.somente atacavel celula de terra
	// 		4.somente selecionável célula vazia
	aplicaEstiloParaCelulasAtacaveis : function ( celulaSelecionada ){

		if( $(celulaSelecionada).attr('tipo') != 'agua' ){
			
			var coluna = parseInt($(celulaSelecionada).attr('coluna')),
				linha = parseInt($(celulaSelecionada).attr('linha')),
				peca = $( celulaSelecionada ).find('.peca'),
				tabuleiroNome = this.model.get('nome');


			if( parseInt(peca.attr('movimentos'), 10 ) > 0 // verifica se peça tem movimentos
				&& Turno.player == peca.attr('player') // verifica se está no turno do dono da peça
			){

			
				// celula acima
				if( (linha-1) > 0  // celula adjacente
					&& $('#coluna_'+coluna+'_linha_'+(linha-1)+'_'+tabuleiroNome).attr('tipo') != 'agua' // celula de terra

				){
					$('#coluna_'+coluna+'_linha_'+(linha-1)+'_'+tabuleiroNome).addClass('atacavel');
				}
				// celula abaixo
				if( (linha+1) > 0  // celula adjacente 
					&& $('#coluna_'+coluna+'_linha_'+(linha+1)+'_'+tabuleiroNome).attr('tipo') != 'agua' // celula de terra 
				){
					$('#coluna_'+coluna+'_linha_'+(linha+1)+'_'+tabuleiroNome).addClass('atacavel');
				}
				// celula direita
				if( 
					(coluna+1) > 0   // celula adjacente
					&& $('#coluna_'+(coluna+1)+'_linha_'+linha+'_'+tabuleiroNome).attr('tipo') != 'agua' // celula de terra
					
				){
					$('#coluna_'+(coluna+1)+'_linha_'+linha+'_'+tabuleiroNome).addClass('atacavel');
				}
				// celula esquerda
				if( 
					(coluna-1) > 0  // celula adjacente 
					&& $('#coluna_'+(coluna-1)+'_linha_'+linha+'_'+tabuleiroNome).attr('tipo') != 'agua' // celula de terra
				){
					$('#coluna_'+coluna+'_linha_'+(linha-1)+'_'+tabuleiroNome).addClass('atacavel');
				}
				// celula abaixo
				if( (linha+1) > 0 && $('#coluna_'+coluna+'_linha_'+(linha+1)+'_'+tabuleiroNome).attr('tipo') != 'agua' ){
					$('#coluna_'+coluna+'_linha_'+(linha+1)+'_'+tabuleiroNome).addClass('atacavel');
				}
				// celula direita
				if( (coluna+1) > 0  && $('#coluna_'+(coluna+1)+'_linha_'+linha+'_'+tabuleiroNome).attr('tipo') != 'agua'){
					$('#coluna_'+(coluna+1)+'_linha_'+linha+'_'+tabuleiroNome).addClass('atacavel');
				}
				// celula esquerda
				if( (coluna-1) > 0 && $('#coluna_'+(coluna-1)+'_linha_'+linha+'_'+tabuleiroNome).attr('tipo') != 'agua' ){
					$('#coluna_'+(coluna-1)+'_linha_'+linha+'_'+tabuleiroNome).addClass('atacavel');
				}
			}
		}
	},

	retiraEstiloParaCelulasAtacaveis : function ( celulaSelecionada ){
		if( celulaSelecionada != false ){

			var coluna = parseInt($(celulaSelecionada).attr('coluna')),
				linha = parseInt($(celulaSelecionada).attr('linha')),
				tabuleiroNome = this.model.get('nome');
			
			// celula acima
			if( (linha-1) > 0 && $('#coluna_'+coluna+'_linha_'+(linha-1)+'_'+tabuleiroNome).attr('tipo') != 'agua' ){
				$('#coluna_'+coluna+'_linha_'+(linha-1)+'_'+tabuleiroNome).removeClass('atacavel');
			}
			// celula abaixo
			if( (linha+1) > 0 && $('#coluna_'+coluna+'_linha_'+(linha+1)+'_'+tabuleiroNome).attr('tipo') != 'agua' ){
				$('#coluna_'+coluna+'_linha_'+(linha+1)+'_'+tabuleiroNome).removeClass('atacavel');
			}
			// celula direita
			if( (coluna+1) > 0 && $('#coluna_'+(coluna+1)+'_linha_'+linha+'_'+tabuleiroNome).attr('tipo') != 'agua' ){
				$('#coluna_'+(coluna+1)+'_linha_'+linha+'_'+tabuleiroNome).removeClass('atacavel');
			}
			// celula esquerda
			if( (coluna-1) > 0 && $('#coluna_'+(coluna-1)+'_linha_'+linha+'_'+tabuleiroNome).attr('tipo') != 'agua' ){
				$('#coluna_'+(coluna-1)+'_linha_'+linha+'_'+tabuleiroNome).removeClass('atacavel');
			}
		}
	},

	montaGride : function(){
		var gride = '';
		gride = this.montaLinhas();
		gride = this.montaColunas(gride);
		return gride;
	},

	montaLinhas : function(){

		var idLinha 	= '',
			linhaAtual 	= '', 
			gride 		= [];
		for( var ctLinha = 1; ctLinha <= this.model.get('linha'); ctLinha++ ) {

			linhaAtual = this.$linha.clone();
			idLinha    = 'linha_' + ctLinha

			$(linhaAtual).attr('id', idLinha);

			gride.push( linhaAtual );
		};

		return gride;
	},

	montaColunas : function( gride ){

		var colunaAtual 	= '',
			contadorLinha 	= 1,
			idColuna 		= '',
			that 			= this;

		$.each( gride, function( index, linha ){

			for( ctColuna = 1; ctColuna <= that.model.get('coluna'); ctColuna++ ) {

				colunaAtual = that.$coluna.clone();
				idColuna	= 'coluna_'+ ctColuna +'_linha_'+ contadorLinha +'_'+ that.model.get('nome');

				$(colunaAtual).attr({ id: idColuna })
								.data({
									tipo: 'terra',
									coluna: ctColuna,
									linha: contadorLinha,
								});				

				linha.append( colunaAtual );

			}

			contadorLinha++;

		});

		return gride;
	},

	render : function() {
		var gride = this.montaGride();
		this.$el.append(gride);
		return this;
	}
});