app.factory("criacaoPerguntasService", criacaoPerguntasService)

function criacaoPerguntasService($http){
    var url = "http://localhost:3000/perguntas"
    function criarPergunta(pergunta) {
        return $http.post(url, pergunta);
    }
    return{
        criarPergunta:criarPergunta
    }
}