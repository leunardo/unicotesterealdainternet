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
        $location.path(`busca/${query}`);
        $scope.query = "";
    }

    function buscarQuizTag(query){
        $location.path(`tag/${query}`)        
        $scope.buscar = buscarQuiz;
        $scope.query = "";
    }
}

function searchController($scope, quizService, usuarioService, $routeParams, $location) {
    let query = $routeParams.q;
    $scope.proximaPagina = proximaPagina;
    $scope.retornarPagina = retornarPagina;
    $scope.nPagina = 1;
    var i = 0;
    let url = $location.path().split('/')[1];
    getQuizzes();

    function getQuizzes(){
        if("busca"===url){
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
            $scope.quizzes = quizList.data;
            getAutor();
        }
        else if($scope.nPagina!=1){
            $scope.nPagina--;
            alert('Não existem mais quizzes para carregar.');
        }else{
            $scope.mensagem = "Não possuimos quizzes com a busca/tag inserida, seja o primeiro a criar um!";
        }
    }

    function getAutor(){
        usuarioService.getUsuarioPorId($scope.quizzes[i].id_usuario).then(assimilarAutor).finally(proximoAutor);
    }

    function proximoAutor(){
        i++;
        if($scope.quizzes[$scope.quizzes.length-1].autor == undefined)
            getAutor();
    }


    function assimilarAutor(user){
        $scope.quizzes[i].autor = user.data[0];
    }

    function proximaPagina(){
        $scope.nPagina++;
        i=0;
        getQuizzes();

    }

    function retornarPagina(){
        if($scope.nPagina >= 2){
            i = 0;
            $scope.nPagina--;
            getQuizzes();
        }
    }
}