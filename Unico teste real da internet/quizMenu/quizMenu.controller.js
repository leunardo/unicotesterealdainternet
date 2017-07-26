app.controller('quizMenuController', quizMenuController);

function quizMenuController($scope, quizService){
    var nPagina = 1;
    var quizList = [];
    getQuizzes();

    function getQuizzes(){
        var quizList = quizService.getQuizzes();
        mostrarQuizzes();
    }

    function mostrarQuizzes(){
        if(nPagina == 1){
            $scope.quizzes = quizList.slice(0, nPagina*20);
        }else{
            $scope.quizzes = quizList.slice(((nPagina-1)*20)-1, nPagina*20);
        }
    }

    function proximaPagina(){
        nPagina++;
        mostrarQuizzes();
    }
}