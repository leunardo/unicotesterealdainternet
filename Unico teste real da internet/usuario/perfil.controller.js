app.controller('perfilController', perfilController);

function perfilController($scope, $routeParams, usuarioService, quizService) {
    getUsuario();
    getQuizzesDoUsuario();
    $scope.checarUser = checarUser;
    $scope.usuario = "";
    $scope.atualizarPerfil = atualizarPerfil;
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
        quizService.getQuizzesDoUsuario($routeParams.id)
            .then(response => {
                $scope.quizzes = response.data;
            }, fail => {
                alert("deu erro");
            })
    }

    function checarUser(){
        return $scope.usuario.id === JSON.parse(localStorage.usuario).id;           
    }

    function atualizarPerfil(){
        usuarioService.atualizarPerfil($scope.usuarioCopia)
            .then(function response(resposta){
                $scope.usuario = angular.copy($scope.usuarioCopia);
            }, function erro(error) {
                console.log(error);
            });
    }
}