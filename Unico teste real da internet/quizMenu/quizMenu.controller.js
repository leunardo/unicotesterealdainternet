app.controller('quizMenuController', quizMenuController);
function quizMenuController($scope, quizService){
    $scope.proximaPagina = proximaPagina;
    $scope.retornarPagina = retornarPagina;
    $scope.nPagina = 1;
    getQuizzes();

    function getQuizzes(){
        quizService.getQuizzes($scope.nPagina).then(mostrarQuizzes);    
    }

    function mostrarQuizzes(quizList){
        if(quizList.data.length > 0){
            $scope.quizzes = quizList.data;
        }
        else{
            $scope.nPagina--;
            alert('Não existem mais quizzes para carregar.');
        }
    }

    function proximaPagina(){
        $scope.nPagina++;
        getQuizzes();

    }

    function retornarPagina(){
        console.log("a")
        if($scope.nPagina >= 2){
            $scope.nPagina--;
            getQuizzes();
        }
    }
}