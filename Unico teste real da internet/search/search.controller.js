app.controller('searchController', searchController);
app.controller('searchHeaderController', searchHeaderController);

function searchHeaderController($scope, $location){
    $scope.query = "";
    $scope.buscar = buscarQuiz;
    $scope.buscarTag = buscarTag;

    function buscarTag(){
        $scope.buscar = buscarQuizTag;
        $scope.query = $scope.query.replace(/, /g, '&');
        $scope.query = $scope.query.replace(/,/g, '&');
    }    

    function buscarQuiz(query){          
        $location.path(`search/${query}`);
        $scope.query = "";
    }

    function buscarQuizTag(query){
        $location.path(`tag/${query}`)        
        $scope.buscar = buscarQuiz;
        $scope.query = "";
    }
}

function searchController($scope, quizService, $routeParams, $location) {
    let query = $routeParams.q;
    $scope.proximaPagina = proximaPagina;
    $scope.retornarPagina = retornarPagina;
    $scope.nPagina = 1;
    let url = $location.path().split('/')[1];
    getQuizzes();

    function getQuizzes(){
        if("search"===url){
            quizService.buscarQuiz(query, $scope.nPagina)
            .then(mostrarQuizzes);
        }
        else{
            quizService.buscarQuizPorTag(query, $scope.nPagina)
            .then(mostrarQuizzes);
        }
    }
    function mostrarQuizzes(quizList){
        if(quizList.data.length > 0){
            $scope.resultado = quizList.data;
        }
        else if ($scope.nPagina!=1){
            $scope.nPagina--;
            alert('Não existem mais quizzes para essa busca!');
        }else{
            $scope.mensagem = "Ainda não existem itens com sua pesquisa! Seja o primeiro a fazer um!"
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