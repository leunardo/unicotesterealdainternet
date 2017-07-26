app.controller('authController', authController);

function authController($scope, authService) {   
    $scope.signIn = authService.signIn;
    $scope.signOut = authService.signOut;   
    $scope.atualizar = atualizar;
    $scope.$watch(
        () =>  authService.isLogado(),
        () => { 
            $scope.logged = authService.isLogado();
            $scope.usuario = JSON.parse(localStorage.getItem('usuario'));             
        });

    function atualizar(){        
        $scope.$apply(() => { $scope.logged = !$scope.logged; });
    }
}