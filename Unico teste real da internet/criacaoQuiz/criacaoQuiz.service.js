app.factory("criacaoQuizService", criacaoQuizService)

function criacaoQuizService($http, URL){
    let url = `${URL}/quizzes`;
    
    function criarQuiz(quiz) {
        return $http.post(url, quiz);
    }

    return { criarQuiz: criarQuiz }
}