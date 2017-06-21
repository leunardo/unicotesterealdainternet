app.factory("quizService", quizService);

function quizService($http) {
    var url = "http://25.116.166.189:3000/"
    var Pontuacao = 0;

    function getPergunta() {
        return $http.get(url + "perguntas");
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
        criarUsuario: criarUsuario
    }

}