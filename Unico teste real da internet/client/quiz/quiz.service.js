app.factory("quizService", quizService);

function quizService($http, URL) {
    var url = `${URL}`;
    var Pontuacao = 0;

    function getQuiz(id) {
        return $http.get(`${url}/quizzes/${id}`);
    }

    function getQuizzes(nPagina){
        return $http.get(`${url}/quizzes?_page=${nPagina}&_limit=8`);
    }    

    function getAllQuizzes(){
        return $http.get(`${url}/quizzes`);
    }

    function getQuizzesDoUsuario(idUsuario, nPagina) {
        return $http.get(`${url}/quizzes/?autor.id=${idUsuario}&_page=${nPagina}&_limit=8`);
    }

    function buscarQuiz(quizQuery, nPagina){
        return $http.get(`${url}/quizzes/busca/${quizQuery}/${nPagina}`);
    }

    function criarQuiz(quiz) {
        return $http.post(`${url}/quizzes`, quiz);
    }

    function alterarQuiz(quiz) {
        return $http.put(`${url}/quizzes/${quiz.id}`, quiz);
    }

    function buscarQuizPorTag(query, nPagina){
        return `${url}/quizzes/tag/${tag}/${nPagina}`; 
    }

    let resultados = [];

    return {
        criarQuiz: criarQuiz,
        alterarQuiz: alterarQuiz,
        getQuiz: getQuiz,
        getQuizzes: getQuizzes,
        getQuizzesDoUsuario: getQuizzesDoUsuario,
        getAllQuizzes: getAllQuizzes,
        buscarQuiz: buscarQuiz,
        buscarQuizPorTag: buscarQuizPorTag,
        resultados: resultados,
    }

}