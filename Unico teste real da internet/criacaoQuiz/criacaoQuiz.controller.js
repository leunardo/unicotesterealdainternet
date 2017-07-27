app.controller('criacaoQuizController', criacaoQuizController);

function criacaoQuizController($scope, criacaoPerguntasService){
    $scope.resposta = []
    $scope.oi = ".";
    $scope.criarPergunta = criarPergunta;

    function criarPergunta(){
        if($scope.pergunta!=""){
            var pergunta = {
                pergunta: $scope.pergunta,
                respostas: []
            }
            for(n = 0; n<5; n++){
                if($scope.resposta[n]==""){
                    scope.resposta[n]=null;
                }
            }
            pergunta.respostas = $scope.resposta;
            criacaoPerguntasService.criarPergunta(pergunta).then(r => {
               $scope.pergunta = "";
               $scope.resposta = [];
            });
        }
    }
}