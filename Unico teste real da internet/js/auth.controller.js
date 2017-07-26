app.controller('authController', authController);

function authController($scope, $interval, authService) {   
    $scope.signIn = authService.signIn;
    $scope.signOut = authService.signOut;

    $scope.$watch(
        () =>  authService.isLogado(),
        () => { $scope.logged = authService.isLogado() });
}