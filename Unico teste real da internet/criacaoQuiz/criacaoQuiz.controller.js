app.controller('criacaoQuizController', criacaoQuizController);

function criacaoQuizController($scope, $location, criacaoQuizService) {
    $scope.pergunta = {
        pergunta: '',
        respostas: []
    };
    $scope.range = {
        min: 0,
        max: 0
    };
    $scope.resultado = {
        resultado: '',
        range: '',
        foto: '',
        explicacao: ''
    };
    $scope.opened = {
        'pessoal': false,
        'pontuacao': false,
        'generica': false
    }
    $scope.quiz = {
        titulo: '',
        foto: '',
        resumo: '',
        perguntas: [],
        resultado: [],
        tags: '',
        modalidade: '',
    };
    $scope.parteQuiz = '1';
    $scope.proximaPergunta = proximaPergunta;
    $scope.adicionarResposta = adicionarResposta;
    $scope.removerResposta = removerResposta;
    $scope.proximaParte = proximaParte;
    $scope.publicar = publicar;
    $scope.selecionarTipoQuiz = selecionarTipoQuiz;
    $scope.modalidadeGenerica = modalidadeGenerica;
    $scope.modalidadePessoal = modalidadePessoal;
    $scope.modalidadePontuacao = modalidadePontuacao;
    $scope.proximoResultado = proximoResultado;
    $scope.alterarRadio = alterarRadio;

    function alterarRadio(index){
        for(let i=0; i<$scope.pergunta.respostas.length; i++){
            if(i!=index){
                $scope.pergunta.respostas[i].nota = 0;
            }else{}
        }
    }

    function modalidadeGenerica() {
        return $scope.quiz.modalidade === "generica";
    }

    function modalidadePessoal() {
        return $scope.quiz.modalidade === "pessoal";
    }

    function modalidadePontuacao() {
        return $scope.quiz.modalidade === "pontuacao";
    }

    function adicionarResposta(resposta) {
        if (resposta.length<3) return;
        $scope.pergunta.respostas.push({
            resposta: resposta,
            nota: 0
        });
        $scope.$$childHead.resposta = '';
        resposta = '';
    }

    function publicar() {
        if(($scope.parteQuiz==2 && $scope.quiz.perguntas.length>6)||($scope.parteQuiz==3 && $scope.quiz.resultado.length>1)){        
            let usuario = JSON.parse(localStorage.usuario);
            $scope.quiz.autor = {
                nome: usuario.nome,
                foto: usuario.foto,
                id: usuario.id,
            };
            if($scope.parteQuiz==2){
                proximaPergunta();
            }else if($scope.parteQuiz==3){
                proximoResultado();
            }
            $scope.quiz.tags = removerEspacosDasTags($scope.quiz.tags);
            criacaoQuizService.criarQuiz($scope.quiz)
                .then(response => {
                    $location.path("quiz/" + response.data.id);
                }, fail => {
                    console.log(fail);
                });
        }else{
            alert("Seu quiz precisa ter ao menos 7 perguntas. Você só fez "+$scope.quiz.perguntas.length+" perguntas até agora.");
            return;
        }
    }

    function proximaPergunta() {
        if ($scope.pergunta.respostas.length < 2) return;
        if ($scope.perguntaForm.pergunta.$invalid) return;
        let copia = {
            pergunta: $scope.pergunta.pergunta,
            respostas: $scope.pergunta.respostas,
        };
        $scope.quiz.perguntas.push(copia);
        $scope.pergunta = {
            pergunta: '',
            respostas: []
        };
        $scope.$$childHead.resposta = '';
    }

    function proximoResultado() {
        if ($scope.perguntaForm.resultado.$invalid||$scope.perguntaForm.range.$invalid
            ||$scope.perguntaForm.fotoResultado.$invalid||$scope.perguntaForm.explicacao.$invalid) return;
        if ($scope.range.max === $scope.quiz.perguntas.length && $scope.quiz.resultado.length == 0) {
            alert("Com um range assim ("+range.min+"-"+range.max+"), o quiz só teria um resultado. Diminua o máximo do range em ao menos 1.");
            return;
        }
        let resultadoCopia = {
            resultado: $scope.resultado.resultado,
            range: "" + $scope.range.min + "-" + $scope.range.max,
            foto: $scope.resultado.foto,
            explicacao: $scope.resultado.explicacao,
        };
        $scope.range.min = $scope.range.max+1;
        $scope.range.max = 0;
        $scope.quiz.resultado.push(resultadoCopia);
        $scope.resultado = {
            resultado: '',
            range: '',
            foto: '',
            explicacao: ''
        }
        if($scope.range.min==$scope.quiz.perguntas.length){
            alert("Não é possivel criar mais resultados, publicando quiz.");
            publicar();
        }
    }

    function removerResposta(indice) {
        $scope.pergunta.respostas.splice(indice, 1);
    }

    function proximaParte() {
        if ($scope.perguntaForm.$valid&&$scope.parteQuiz==1&&$scope.quiz.modalidade != '') {
            $scope.parteQuiz++;
        }
        else if($scope.parteQuiz==2&&$scope.quiz.perguntas.length>6){
            proximaPergunta();
            $scope.parteQuiz++;
            $scope.range.max = $scope.quiz.perguntas.length;
        }else if($scope.parteQuiz==2&&$scope.quiz.perguntas.length<=6){
            alert("Seu quiz precisa ter ao menos 7 perguntas. Você só fez "+$scope.quiz.perguntas.length+" perguntas até agora.");
        }
    }

    function removerEspacosDasTags(tags) {
        return tags.replace(/[, ]+[ ,]+/g, ',');
    }

    function selecionarTipoQuiz(tipo) {
        for (e in $scope.opened) {
            if (e === tipo) {
                $scope.opened[e] = !$scope.opened[e];
                $scope.quiz.modalidade = tipo;                
            }
            else
                $scope.opened[e] = false;
        }
    }
}