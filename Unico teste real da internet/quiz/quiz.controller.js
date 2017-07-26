app.controller("quizController", quizController);

function quizController($scope, quizService, usuarioService, $location) {
    $scope.questoes = [];
    $scope.notas = [];
    $scope.nPergunta = 0;
    $scope.avancarPergunta = avancarPergunta;
    $scope.retrocederPergunta = retrocederPergunta;
    var notaFinal = 0;
    getPergunta();

    function getPergunta() {
        quizService.getPergunta().then(
            c => {
                $scope.questoes = c.data;
                mostrarPergunta($scope.nPergunta);
            },
            error => {
                alert("Não foi possivel encontrar as perguntas");
            });
    }

    function contabilizarPergunta(nota, avancar){
        if(avancar){
            $scope.notas[$scope.nPergunta] = nota;
        }else{
            $scope.notas[$scope.nPergunta] = 0;
        }
    }

    function mostrarPergunta(nPergunta) {
        $scope.questao = $scope.questoes[nPergunta];
    }

    function avancarPergunta(nota) {
        if ($scope.nPergunta < $scope.questoes.length - 1) {
            contabilizarPergunta(nota, true); 
            $scope.nPergunta++;
            mostrarPergunta($scope.nPergunta);
        } else {
            contabilizarPergunta(nota, true);
            encerrarQuiz();
        }
    }

    function encerrarQuiz() {
        alert("Parabéns! Você terminou o Unico Teste (DE PONTUAÇAO GENERICA) Real da Internet!");
        notaFinal = $scope.notas.reduce(function(notaAnterior, notaAtual){
            return notaAnterior + notaAtual;
        })
        usuarioService.atualizarUsuario(notaFinal);
        $location.path("/resultado");
    }    

    function retrocederPergunta() {
        $scope.nPergunta--;
        contabilizarPergunta(0, false);
        mostrarPergunta($scope.nPergunta);
    }
    
}