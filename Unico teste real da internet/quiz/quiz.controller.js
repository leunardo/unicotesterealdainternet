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
    getQuiz();

    function getQuiz() {
        quizService.getQuiz(id).then(
            c => {
                $scope.quiz = c.data;
                setRedirectModalidade();
            },
            error => {
                alert("Não foi possivel encontrar as perguntas");
            });
    }
    
    function setRedirectModalidade(){        
        $scope.redirecionar = `quiz/parte3-${$scope.quiz.modalidade}.html`;        
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
        $scope.parteQuiz = 3;
        adicionarUsuarioAoQuiz();
        pegarResultado();
    }

    function adicionarUsuarioAoQuiz() {
        let idUsuario = JSON.parse(localStorage.usuario).id;
        let usuarioJaRespondeu = 
            $scope.quiz.usuariosQueResponderam.indexOf(idUsuario) > -1;
                        
        if(!usuarioJaRespondeu) {
            $scope.quiz.usuariosQueResponderam
                .push(idUsuario); 
            salvarUsuarioNoQuiz($scope.quiz);
        }
    }

    function retrocederPergunta() {
        nPergunta--;
        contabilizarPergunta(0, false);
        mostrarPergunta(nPergunta);
    }

    function salvarUsuarioNoQuiz(quiz) {
        quizService.alterarQuiz(quiz)
            .then(response => {
                console.log(response);
            }, fail => {
                console.log(fail);
            })
    }

    function proximaParte() {
        $scope.parteQuiz = 2;
        mostrarPergunta(nPergunta);
    }

    function pegarResultado() {
        if ($scope.quiz.modalidade === 'generica')
            gerarResultado();

        else {
            let usuario = JSON.parse(localStorage.usuario);
            let user = {
                id: usuario.id,
                nome: usuario.nome,
                foto: usuario.foto,
                nota: $scope.notaFinal,
            };

            if(existeTop3Usuarios()) {
                $scope.quiz.top3.push(user);                
                $scope.quiz.top3.sort(ordenarPorNota);
                $scope.quiz.top3.splice(3);

                function ordenarPorNota(a, b) {
                    if (a.nota < b.nota) return 1;
                    if (a.nota > b.nota) return -1;
                    return 0;
                }
            } else 
                $scope.quiz.top3.push(user);
            
            salvarUsuarioNoQuiz($scope.quiz);
        }
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

    function existeTop3Usuarios() {
        return $scope.quiz.top3.length === 3;
    }
}