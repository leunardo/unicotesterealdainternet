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

    function modalidadeGenerica() {
        console.log($scope.quiz.modalidade === "generica");
        return $scope.quiz.modalidade === "generica";
    }

    function modalidadePessoal() {
        console.log($scope.quiz.modalidade === "pessoal");
        return $scope.quiz.modalidade === "pessoal";
    }

    function modalidadePontuacao() {
        console.log($scope.quiz.modalidade === "pontuacao");
        return $scope.quiz.modalidade === "pontuacao";
    }

    function adicionarResposta(resposta) {
        if ($scope.perguntaForm.resposta.$invalid) return;
        $scope.pergunta.respostas.push({
            resposta: resposta
        });
        $scope.$$childHead.resposta = '';
    }

    function publicar() {
        let usuario = JSON.parse(localStorage.usuario);
        $scope.quiz.autor = {
            nome: usuario.nome,
            foto: usuario.foto,
            id: usuario.id,
        };
        $scope.quiz.tags = removerEspacosDasTags($scope.quiz.tags);
        criacaoQuizService.criarQuiz($scope.quiz)
            .then(response => {
                $location.path("quiz/" + response.data.id);
            }, fail => {
                console.log(fail);
            });
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
        if ($scope.perguntaForm.resultado.$invalid) return;
        if ($scope.range.max === $scope.quiz.perguntas.length && $scope.quiz.resultado.length == 0) {
            alert("Com um range assim ({{range.min}}-{{range.max}}), só poderia ter um resultado. Diminua ele em ao menos 1.");
            return;
        }
        let resultadoCopia = {
            resultado: $scope.resultado.resultado,
            range: "" + $scope.range.min + "-" + $scope.range.max,
            foto: $scope.resultado.foto,
            explicacao: $scope.resultado.explicacao,
        };
        console.log(resultadoCopia);
        $scope.range.min = $scope.range.max + 1;
        $scope.range.max = 0;
        $scope.quiz.resultado.push(resultadoCopia);
        $scope.resultado = {
            resultado: '',
            range: '',
            foto: '',
            explicacao: ''
        }
    }

    function removerResposta(indice) {
        $scope.pergunta.respostas.splice(indice, 1);
    }

    function proximaParte() {
        if ($scope.perguntaForm.$valid) {
            proximaPergunta();
            $scope.parteQuiz++;
        }
        if ($scope.parteQuiz == 3) {
            $scope.range.max = $scope.quiz.perguntas.length;
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