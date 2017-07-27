app.controller('homeController', homeController);

function homeController($scope, quizService, authService) {  
    $scope.logged = authService.isLogado();
    var quizzes = ["oi"];
    let i = 0;
    let id = 0;
    let idsUsados = [0];
    let quizData = [];
    getQuizzes();

    function getQuizzes(){
        quizService.getAllQuizzes().then(getRandomQuizzes);
    }
    
    function getRandomQuizzes(quizList){
        quizData = quizList.data;
        for(var i=0; i<4; i++){
            while(contem(id, idsUsados)||id==0){
                id = Math.floor(Math.random()*(quizData.length)+1);
            }
            idsUsados[i+1] = id;
            quizService.getQuiz(id).then(mostrarQuiz)
        }
    }

    function mostrarQuiz(quiz){
        quizzes[i] = quiz.data;
        i++;
        if(quizzes.length==4){
            $scope.quizzes = quizzes;
        }
    }

    function contem(id, idsUsados) {
        for (var i = 0; i < idsUsados.length; i++) {
            if (idsUsados[i] === id) {
                return true;
            }
        }
        return false;
    }
}