app.controller('homeController', homeController);

function homeController($scope, authService) {  
    $scope.logged = authService.isLogado();
}