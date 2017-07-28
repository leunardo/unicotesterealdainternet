app.controller('perfilController', perfilController);

function perfilController($scope, $routeParams, usuarioService, quizService) {
    getUsuario();
    getQuizzesDoUsuario();
    $scope.proximaPagina = proximaPagina;
    $scope.retornarPagina = retornarPagina;
    $scope.nPagina = 1;

    function getUsuario() {
        usuarioService.getUsuarioPorId($routeParams.id)
            .then(response => {
                $scope.usuario = response.data;
            }, fail => {
                alert("Deu erro");
            });
    }

    function getQuizzesDoUsuario() {
        quizService.getQuizzesDoUsuario($routeParams.id, $scope.nPagina)
            .then(mostrarQuizzes);
    }

    function mostrarQuizzes(quizList){
        if(quizList.data.length > 0){
            $scope.quizzes = quizList.data;
        }
        else if ($scope.nPagina!=1){
            $scope.nPagina--;
            alert('Este usuário não possui mais quizzes!');
        }else{
            $scope.mensagem = "Esse usuário ainda não possui quizzes. Incentive-o a criar um!";
        }
    }

    function proximaPagina(){
        $scope.nPagina++;
        getQuizzesDoUsuario();

    }

    function retornarPagina(){
        if($scope.nPagina >= 2){
            $scope.nPagina--;
            getQuizzesDoUsuario();
        }
    }
}