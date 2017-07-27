app.factory("criacaoQuizService", criacaoQuizService)

function criacaoQuizService($http, URL){
    var url = `${URL}/perguntas`;
    function criarPergunta(pergunta) {
        return $http.post(url, pergunta);
    }
    return{
        criarPergunta:criarPergunta
    }
}