app.controller("resultadoController", resultadoController);

function resultadoController($scope, quizService){
    $scope.QI = quizService.getQI;
    $scope.nome = JSON.parse(localStorage.usuario).nome;
}