app.controller('perfilController', perfilController);

function perfilController($scope, $routeParams, authService, usuarioService, quizService) {
    getUsuario();
    getQuizzesDoUsuario();
    $scope.checarUser = checarUser;
    $scope.usuario = "";
    $scope.atualizarPerfil = atualizarPerfil;
    $scope.proximaPagina = proximaPagina;
    $scope.retornarPagina = retornarPagina;
    $scope.nPagina = 1;
    $scope.editarPerfil = editarPerfil;
    $scope.fecharModal = fecharModal;

    function getUsuario() {
        usuarioService.getUsuarioPorId($routeParams.id)
            .then(response => {
                $scope.usuario = response.data; 
                $scope.usuarioCopia = angular.copy($scope.usuario);
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
        }else if (!checarUser()){
            $scope.mensagem = "Esse usuário ainda não possui quizzes. Incentive-o a criar um!";
        }else{
            $scope.mensagem = "Ei, você ainda não tem nenhum quiz :( Vai deixar todo mundo esperando!? Vamos, faz um! É fácil e divertido!"
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

    function checarUser(){
        if(authService.isLogado()){
            return $scope.usuario.id === JSON.parse(localStorage.usuario).id;           
        }else{
            return false;
        }
    }
    function editarPerfil(){
        document.querySelector('body').style.overflow = "hidden";
        document.getElementById('modal').style.display = "block";
    }

    function fecharModal() {
        document.querySelector('body').style.overflow = "auto";
        document.getElementById('modal').style.display = "none";   
    }

    function atualizarPerfil(){
        usuarioService.atualizarPerfil($scope.usuarioCopia)
            .then(function response(resposta){
                $scope.usuario = angular.copy($scope.usuarioCopia);
                localStorage.usuario = JSON.stringify($scope.usuario);
            }, function erro(error) {
                console.log(error);
            });
    }
}