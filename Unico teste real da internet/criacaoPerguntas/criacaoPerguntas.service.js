app.factory("criacaoPerguntasService", criacaoPerguntasService)

function criacaoPerguntasService($http, URL){
    var url = `${URL}/perguntas`;
    function criarPergunta(pergunta) {
        return $http.post(url, pergunta);
    }
    return{
        criarPergunta:criarPergunta
    }
}