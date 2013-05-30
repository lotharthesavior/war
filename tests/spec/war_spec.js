describe("War Game", function() {

  var tabuleiro;  

  beforeEach(function() {
    tabuleiro = new Tabuleiro();
  });


  it("Deve iniciar o jogo com um tabuleiro", function() {
    var war = new War(tabuleiro);
  
    expect( war.tabuleiroAtual ).toEqual( tabuleiro );
  });

  

});