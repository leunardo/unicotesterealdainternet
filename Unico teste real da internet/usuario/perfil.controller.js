app.controller('perfilController', perfilController);

function perfilController($scope, $routeParams, usuarioService, quizService) {
    getUsuario();
    getQuizzesDoUsuario();

    function getUsuario() {
        usuarioService.getUsuarioPorId($routeParams.id)
            .then(response => {
                $scope.usuario = response.data;
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
}