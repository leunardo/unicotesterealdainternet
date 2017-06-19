app.factory("criacaoPerguntasService", criacaoPerguntasService)

function criacaoPerguntasService($http){
    var url = "http://25.116.166.189:3000/perguntas"
    function criarPergunta(pergunta) {
        return $http.post(url, pergunta);
    }
    return{
        criarPergunta:criarPergunta
    }
}