app.controller("rankingController", rankingController);

function rankingController ($scope, quizService) {
    getUsuarios();
    


    function sortMaiorScore (a, b) {
        if (a.Pontuacao < b.Pontuacao) return 1;
        else if (a.Pontuacao > b.Pontuacao) return -1;
        return 0;
    }   

    function getUsuarios () {
        quizService.getUsuario().then(
            response =>{
                $scope.usuarios = response.data;
                $scope.usuarios.sort(sortMaiorScore);

                $scope.top10 = $scope.usuarios.slice(0,10);
            },
            fail => {
                alert("Ops, não foi possivel pegar o rank.");
            }
        )
    }
}