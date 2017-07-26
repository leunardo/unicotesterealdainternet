app.controller('quizMenuController', quizMenuController);

function quizMenuController($scope, quizService){
    $scope.nPagina = 0;
    getQuizzes();

    function getQuizzes(){
        quizService.getQuizzes($scope.nPagina).then(mostrarQuizzes);    
    }

    function mostrarQuizzes(quizList){
        $scope.quizzes = quizList.data;
    }

    function proximaPagina(){
        nPagina++;
        mostrarQuizzes();
    }
}