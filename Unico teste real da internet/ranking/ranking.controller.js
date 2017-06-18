app.controller("rankingController", rankingController);

function rankingController ($scope, quizService) {
    getUsuarios();
    


    function sortMaiorQI (a, b) {
        if (a.QI < b.QI) return 1;
        else if (a.QI > b.QI) return -1;
        return 0;
    }   

    function getUsuarios () {
        quizService.getUsuario().then(
            response =>{
                $scope.usuarios = response.data;
                $scope.usuarios.sort(sortMaiorQI);

                $scope.top5 = $scope.usuarios.slice(0,5);
                $scope.bot5 = $scope.usuarios.slice(-5);
            },
            fail => {
                alert("Ops, não foi possivel pegar o rank.");
            }
        )
    }
}