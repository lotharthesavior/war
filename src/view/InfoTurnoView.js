var app = app || {};

app.InfoTurnoView = Backbone.View.extend({  

	infoTpl : _.template( $('#info-turno-tpl').html() ),

	render: function() {
		this.$el.html( this.infoTpl( this.model.toJSON() ) );
    	return this;
  	}
});