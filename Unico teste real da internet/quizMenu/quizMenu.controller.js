app.controller('quizMenuController', quizMenuController);
function quizMenuController($scope, quizService){
    $scope.proximaPagina = proximaPagina;
    $scope.retornarPagina = retornarPagina;
    $scope.nPagina = 1;
    getQuizzes();

    function setTags(){
        for(let i = 0; i<$scope.quizzes.length; i++){
            $scope.quizzes[i].tags = $scope.quizzes[i].tags.split(',');
            console.log($scope.quizzes[i].tags);
        }
    }

    function getQuizzes(){
        quizService.getQuizzes($scope.nPagina).then(mostrarQuizzes);    
    }

    function mostrarQuizzes(quizList){
        if(quizList.data.length > 0){
            $scope.quizzes = quizList.data;
            setTags();
        }
        else if($scope.nPagina!=1){
            $scope.nPagina--;
            alert('Não existem mais quizzes para carregar.');
        }else{
            $scope.mensagem = "Não possuimos nenhum quiz no momento, contribua e faça história criando o primeiro!";
        }
    }

    function proximaPagina(){
        $scope.nPagina++;
        getQuizzes();

    }

    function retornarPagina(){
        if($scope.nPagina >= 2){
            $scope.nPagina--;
            getQuizzes();
        }
    }
}