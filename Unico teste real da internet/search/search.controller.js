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
    quizService.buscarQuiz(query)
    .then(response => {
        $scope.resultado = response.data;
    });
}