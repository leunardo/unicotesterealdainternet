app.controller("quizController", quizController);

function quizController($scope, quizService, usuarioService, $location, $routeParams) {
    $scope.quiz;   
    $scope.notas = [];
    $scope.resultado = [];    
    $scope.parteQuiz = 1; 
    $scope.proximaParte = proximaParte;
    $scope.avancarPergunta = avancarPergunta;
    $scope.retrocederPergunta = retrocederPergunta;
    $scope.pegarResultado = pegarResultado;   
    $scope.notaFinal = 0;
    let nPergunta = 0;
    let id = $routeParams.id;
    let modalidade = "";
    getQuiz();

    function getQuiz() {
        quizService.getQuiz(id).then(
            c => {
                $scope.quiz = c.data;    
                setarTags();
                setModalidade();           
            },
            error => {
                alert("Não foi possivel encontrar as perguntas");
            });
    }
    
    function setarTags(){
        $scope.quiz.tags = $scope.quiz.tags.split(',');
    }

    function setModalidade(){
        modalidade = $scope.quiz.modalidade;
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
        $scope.notaFinal = $scope.notas.reduce(function(notaAnterior, notaAtual){
            return notaAnterior + notaAtual;
        });
        // pegarResultado();
        $scope.parteQuiz = 3;
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

    function pegarResultado() {
        if ($scope.quiz.modalidade === 'generica')
            gerarResultado();

        return `quiz/parte3-${$scope.quiz.modalidade}.html`;
    }

    function gerarResultado() {
        function pegarRangeDoResultado(resultado) {
            return resultado.range.split('-');
        }

        function checarSeEstaNoRange(array) {
            return array[0] <= $scope.notaFinal && array[1] >= $scope.notaFinal;
        }

        $scope.quiz.resultado.forEach(r => {
            if (checarSeEstaNoRange(pegarRangeDoResultado(r))) {
                $scope.resultado.resultado = r.resultado;
                $scope.resultado.range = r.range;
                $scope.resultado.explicacao = r.explicacao;
                $scope.resultado.foto = r.foto;
            }
        });
    }    
}