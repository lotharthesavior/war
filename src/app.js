var app = app || {};

app.AppView = Backbone.View.extend({

	initialize : function() {
		this.$infoTurno = $('#container-info-turno');
		this.$tabuleiro = $('#container-tabuleiro');
	},

	render : function() {
		var info 			= new Backbone.Model({ playerAtual: 'player1' }),
			tabuleiro 		= new Backbone.Model({ linha: 10, coluna : 10, nome : 'tabuleiro1' }),
			infoView 		= new app.InfoTurnoView({model:info}),
			tabuleiroView 	= new app.TabuleiroView({model:tabuleiro});

		this.$infoTurno.html( infoView.render().el );	
		this.$tabuleiro.html( tabuleiroView.render().el );
	}

});