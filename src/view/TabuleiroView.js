var app = app || {};

app.TabuleiroView = Backbone.View.extend({

	TOTAL_LINHAS : 10,

	TOTAL_COLUNAS : 10,

	NOME : 'tabuleiro1',	


	initialize: function() {
		this.$linha 			= $('<div class="linha"></div>');
		this.$coluna 			= $('<div class="coluna celula_desselecionada"></div>');
		this.$celulaSelecionada = false;
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
			//aplicaMovimento( this.$celulaSelecionada, selecaoAnterior );
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
			//aplicaEstiloParaCelulasAtacaveis( this.$celulaSelecionada );		

			this.$celulaSelecionada.removeClass('celula_desselecionada');
			this.$celulaSelecionada.addClass('celula_selecionada'); 
		}
	},

	desselecao : function( $celula ) {
		if($celula) {
			$celula.removeClass('celula_selecionada');
			$celula.addClass('celula_desselecionada');			
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
		for( var ctLinha = 1; ctLinha <= this.TOTAL_LINHAS; ctLinha++ ) {

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

			for( ctColuna = 1; ctColuna <= that.TOTAL_COLUNAS; ctColuna++ ) {

				colunaAtual = that.$coluna.clone();
				idColuna	= 'coluna_'+ ctColuna +'_linha_'+ contadorLinha +'_'+ that.NOME;

				$(colunaAtual).attr({ id: idColuna })
								.data({
									tipo: 'terra',
									coluna: ctColuna,
									linha: contadorLinha					
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