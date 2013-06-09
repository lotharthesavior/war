var app = app || {};

app.TabuleiroView = Backbone.View.extend({

	TOTAL_LINHAS : 10,

	TOTAL_COLUNAS : 10,

	NOME : 'tabuleiro1',	

	initialize: function() {
		this.$linha 	= $('<div class="linha_'+ this.NOME +'"></div>');
		this.$coluna 	= $('<div class="coluna_'+ this.NOME +' celula_desselecionada"></div>');
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
			idLinha 	= 'linha_' + ctLinha +'_'+ this.NOME

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