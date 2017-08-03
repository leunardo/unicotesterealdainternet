app.controller("rankingController", rankingController);

function rankingController ($scope, usuarioService) {
    getUsuarios();
    function sortMaiorNota (a, b) {
        if (a.nota < b.nota) return 1;
        else if (a.nota > b.nota) return -1;
        return 0;
    }   

    function getUsuarios () {
        usuarioService.getUsuario().then(
            response =>{
                $scope.usuarios = response.data;
                $scope.usuarios.sort(sortMaiorNota);

                $scope.top20 = $scope.usuarios.slice(0,20);
            },
            fail => {
                alert("Ops, não foi possivel pegar o rank.");
            }
        )
    }
}