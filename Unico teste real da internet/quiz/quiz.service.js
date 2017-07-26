app.factory("quizService", quizService);

function quizService($http, URL) {
    var url = `${URL}`;
    var Pontuacao = 0;

    function getPergunta(id) {
        return $http.get(`${url}/quizzes/id/perguntas`);
    }

    function getQuizzes(nPagina){
        return $http.get(`${url}/quizzes?_page=${nPagina}&_limit=20`);
    }    

    return {
        getPergunta: getPergunta,
        getPontuacao: Pontuacao,        
        getQuizzes: getQuizzes,        
    }

}