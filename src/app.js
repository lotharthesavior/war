var app = app || {};

app.AppView = Backbone.View.extend({

	initialize : function() {
		this.$infoTurno = $('#container-info-turno');
	},

	render : function() {
		var info 		= new Backbone.Model({ playerAtual: 'player1' }),
			infoView 	= new app.InfoTurnoView({model:info});

		this.$infoTurno.html( infoView.render().el );	
	}

});