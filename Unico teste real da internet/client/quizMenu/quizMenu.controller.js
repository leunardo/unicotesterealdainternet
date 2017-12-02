app.controller('quizMenuController', quizMenuController);
function quizMenuController($scope, quizService, usuarioService){
    $scope.proximaPagina = proximaPagina;
    $scope.retornarPagina = retornarPagina;
    $scope.nPagina = 1;
    var i = 0;
    getQuizzes();

    function getQuizzes(){
        quizService.getQuizzes($scope.nPagina).then(mostrarQuizzes);    
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
            $scope.mensagem = "Não possuimos nenhum quiz no momento, contribua e faça história criando o primeiro!";
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