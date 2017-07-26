app.factory("quizService", quizService);

function quizService($http) {
    var url = "http://localhost:3000/"
    var Pontuacao = 0;

    function getPergunta(id) {
        return $http.get(url + "quizzes/"+id+"/perguntas");
    }

    function getQuizzes(nPagina){
        return $http.get(`${url}quizzes?_page=${nPagina}&_limit=16`);
    }

    function getUsuario() {
        return $http.get(url + "usuarios");
    }

    function criarUsuario(usuario) {
        return $http.post(url + "usuarios", usuario);
    }

    return {
        getPergunta: getPergunta,
        getPontuacao: Pontuacao,
        getUsuario: getUsuario,
        getQuizzes: getQuizzes,
        criarUsuario: criarUsuario
    }

}