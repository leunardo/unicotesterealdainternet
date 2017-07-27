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

    function getQuizzesDoUsuario(idUsuario) {
        return $http.get(`${url}/quizzes/?autor.id=${idUsuario}`);
    }

    return {
        getQuiz: getQuiz,
        getQuizzes: getQuizzes,
        getQuizzesDoUsuario: getQuizzesDoUsuario,
        getAllQuizzes: getAllQuizzes
    }

}