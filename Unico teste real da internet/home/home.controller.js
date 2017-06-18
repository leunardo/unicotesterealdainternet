app.controller('homeController', homeController);

function homeController ($scope, $location) {
    $scope.avancar = avancar;

    function avancar () {
        localStorage.nome = $scope.usuario.nome;
        $location.path('/quiz');
    }
}