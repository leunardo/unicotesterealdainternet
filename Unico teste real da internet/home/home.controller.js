app.controller('homeController', homeController);

function homeController($scope, $rootScope, $location) {
    //$scope.avancar = avancar;
    $rootScope.logged = false;


    function signOut() {

        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {

            $rootScope.logged = false;

            $location.path('/index');
            $scope.$apply();
        });

    }

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        localStorage.nome = profile.getName();

        $rootScope.logged = true;
        $location.path('/quiz');
        $scope.$apply();

        //todo: redirecionar para todos a lista de quizes
        
    }

    window.signOut = signOut;
    window.onSignIn = onSignIn;

}