app.controller("quizController", quizController);

function quizController($scope, quizService, usuarioService, $location, $routeParams) {
    $scope.quiz;   
    $scope.notas = [];
    $scope.parteQuiz = 1; 
    $scope.proximaParte = proximaParte;
    $scope.avancarPergunta = avancarPergunta;
    $scope.retrocederPergunta = retrocederPergunta;   
    let nPergunta = 0;
    let id = $routeParams.id;
    let notaFinal = 0;
    getQuiz();

    function getQuiz() {
        quizService.getQuiz(id).then(
            c => {
                $scope.quiz = c.data;    
                setarTags();            
            },
            error => {
                alert("Não foi possivel encontrar as perguntas");
            });
    }
    
    function setarTags(){
        $scope.quiz.tags = $scope.quiz.tags.split(',');
        console.log($scope.quiz.tags);
    }

    function contabilizarPergunta(nota, avancar){
        if(avancar){
            $scope.notas[nPergunta] = nota;
        }else{
            $scope.notas[nPergunta] = 0;
        }
    }

    function mostrarPergunta(nPergunta) {
        $scope.questao = $scope.quiz.perguntas[nPergunta];
    }

    function avancarPergunta(nota) {
        if (nPergunta < $scope.quiz.perguntas.length - 1) {
            contabilizarPergunta(nota, true); 
            nPergunta++;
            mostrarPergunta(nPergunta);
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
    }    

    function retrocederPergunta() {
        nPergunta--;
        contabilizarPergunta(0, false);
        mostrarPergunta(nPergunta);
    }

    function proximaParte() {
        $scope.parteQuiz = 2;
        mostrarPergunta(nPergunta);
    }
    
}