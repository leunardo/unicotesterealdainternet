app.controller('criacaoQuizController', criacaoQuizController);

function criacaoQuizController($scope, criacaoQuizService){
    $scope.respostas = []
    // $scope.proximaPergunta = proximaPergunta;
    // $scope.criarPergunta = criarPergunta;
    $scope.adicionarResposta = adicionarResposta;
    $scope.removerResposta = removerResposta;

    // function criarPergunta(){
    //     if($scope.pergunta!=""){
    //         var pergunta = {
    //             pergunta: $scope.pergunta,
    //             respostas: []
    //         }
    //         for(n = 0; n<5; n++){
    //             if($scope.resposta[n]==""){
    //                 scope.resposta[n]=null;
    //             }
    //         }
    //         pergunta.respostas = $scope.resposta;
    //         criacaoPerguntasService.criarPergunta(pergunta).then(r => {
    //            $scope.pergunta = "";
    //            $scope.resposta = [];
    //         });
    //     }
    // }

    function adicionarResposta() {
        let copia = angular.copy($scope.resposta);
        $scope.resposta = '';
        $scope.respostas.push(copia);
    }

    function removerResposta(indice) {
        $scope.respostas.splice(indice, 1);
    }
 }