app.controller('homeController', homeController);

function homeController($scope, $location, authService) {
    $scope.logged = authService.isLogado;
}