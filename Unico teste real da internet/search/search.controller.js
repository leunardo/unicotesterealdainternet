app.controller('searchController', searchController);
app.controller('searchHeaderController', searchHeaderController);

function searchHeaderController($scope, $location){
    $scope.query = "";
    $scope.buscarQuiz = buscarQuiz;    

    function buscarQuiz(query){          
        $location.path(`search/${query}`);
    }
}

function searchController($scope, quizService, $routeParams) {
    let query = $routeParams.q;
    $scope.proximaPagina = proximaPagina;
    $scope.retornarPagina = retornarPagina;
    $scope.nPagina = 1;

    getQuizzes();
    function getQuizzes(){
        quizService.buscarQuiz(query, $scope.nPagina)
        .then(mostrarQuizzes);
    }
    function mostrarQuizzes(quizList){
        if(quizList.data.length > 0){
            $scope.resultado = quizList.data;
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