
$(document).ready(function(){
	
	// variaveis
		

	$('#tabuleiro').html( estrutura );

	$.each( linhas, function( index, value ){
		$('#tabuleiro').append( value );
	});

});