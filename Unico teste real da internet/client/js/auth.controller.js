app.controller('authController', authController);

function authController($scope, authService) {   
    $scope.signIn = authService.signIn;
    $scope.signOut = authService.signOut;   
    $scope.atualizar = atualizar;       

    $scope.$watch(
        () => { 
            $scope.logged = authService.isLogado();
            if($scope.logged) 
                $scope.usuario = JSON.parse(localStorage.usuario);           
        }
    );
    
    $scope.$watch("usuario", () => {
        localStorage.usuario = JSON.stringify($scope.usuario);
    }, true
    )

    function atualizar(){        
       $scope.logged = !$scope.logged;
    }
}