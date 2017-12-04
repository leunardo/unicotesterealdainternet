app.controller('criacaoQuizController', criacaoQuizController);

function criacaoQuizController($scope, authService, $location, quizService) {
    $scope.pergunta = {
        pergunta: '',
        respostas: []
    };
    $scope.range = {
        min: 1,
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
        'generico': false
    }
    $scope.quiz = {
        titulo: '',
        url_foto: null,
        resumo: '',
        perguntas: [],
        resultado: [],
        tags: [],
        modalidade: 0
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
    let resultadoCopia = [];
    let fim = false;
    checarSeLogado();

    function checarSeLogado(){
        if(authService.isLogado()){
            return;
        }else{
            alertify.alert("Faça login para continuar!");
            $location.path("index");
        }
    }

    function alterarRadio(index){
        for(let i=0; i<$scope.pergunta.respostas.length; i++){
            if(i!=index){
                $scope.pergunta.respostas[i].nota = 0;
            }else{}
        }
    }

    function modalidadePessoal() {
        return $scope.quiz.modalidade === 'pessoal';
    }

    function modalidadePontuacao() {
        return $scope.quiz.modalidade === 'pontuacao';
    }

    function modalidadeGenerica() {
        return $scope.quiz.modalidade === 'generico';
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

    function checarSeTodaLacunaDeNotaERepresentadaPelosRanges(){
        for(let i = 0; i<$scope.quiz.resultado.length; i++){
            let rangeMax = $scope.quiz.resultado[i].range.split('-')[1];
            if(rangeMax==$scope.quiz.perguntas.length){
                return true;
            }
        }
        alertify.alert("Você ainda não fez resultados para todas as notas possiveis.");
        return false;
    }

    function publicar() {
        if(($scope.parteQuiz==2 && $scope.quiz.perguntas.length>6)||($scope.parteQuiz==3 && $scope.quiz.resultado.length>1 && checarSeTodaLacunaDeNotaERepresentadaPelosRanges())){        
            let usuario = JSON.parse(localStorage.usuario);
            $scope.quiz.id_usuario = usuario.id_usuario;
            if($scope.parteQuiz==2){
                proximaPergunta();
            }else if($scope.parteQuiz==3&&!fim){
                proximoResultado();
            }
            $scope.quiz.usuariosQueResponderam = [];
            if($scope.quiz.modalidade!="generico"){
                $scope.quiz.top3 = [];
            }
            quizService.criarQuiz($scope.quiz);
            alertify.alert("Quiz criado com sucesso. Redirecionando para home.")
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
            alertify.alert("Com um range assim ("+range.min+"-"+range.max+"), o quiz só teria um resultado. Diminua o máximo do range em ao menos 1.");
            return;
        }
        if($scope.quiz.resultado.length==0){
            resultadoCopia = {
                resultado: $scope.resultado.resultado,
                range: "" + ($scope.range.min-1) + "-" + $scope.range.max,
                foto: $scope.resultado.foto,
                explicacao: $scope.resultado.explicacao,
            };
        }else{
            resultadoCopia = {
                resultado: $scope.resultado.resultado,
                range: "" + $scope.range.min + "-" + $scope.range.max,
                foto: $scope.resultado.foto,
                explicacao: $scope.resultado.explicacao,
            };
        }
        $scope.quiz.resultado.push(resultadoCopia);
        if($scope.range.max==$scope.quiz.perguntas.length){
            alertify.alert("Não é possivel criar mais resultados, publicando quiz.");
            fim = true;
            publicar();
        }else{
            $scope.range.min = $scope.range.max+1;
            $scope.range.max = 0;
            $scope.resultado = {
                resultado: '',
                range: '',
                foto: '',
                explicacao: ''
            }
        }
    }

    function removerResposta(indice) {
        $scope.pergunta.respostas.splice(indice, 1);
    }

    function proximaParte() {
        if ($scope.perguntaForm.$valid&&$scope.parteQuiz==1&&$scope.quiz.modalidade != '') {        
            removerEspacosDasTags()            
            $scope.quiz.id_modalidade = ($scope.quiz.modalidade == 'generico')? 3: ($scope.quiz.modalidade == 'pontuacao')? 2: 1;
            $scope.parteQuiz++;
        }
        else if($scope.parteQuiz==2&&$scope.quiz.perguntas.length>6){
            proximaPergunta();
            $scope.parteQuiz++;
            $scope.range.max = $scope.quiz.perguntas.length;
        }else if($scope.parteQuiz==2&&$scope.quiz.perguntas.length<=6){
            alertify.alert("Seu quiz precisa ter ao menos 7 perguntas. Você só fez "+$scope.quiz.perguntas.length+" perguntas até agora.");
        }
    }

    function removerEspacosDasTags() {
        $scope.quiz.tags = $scope.quiz.tags.split(',')
        for(let k = 0; k < $scope.quiz.tags.length; k++){
            for(let i = 0; i < $scope.quiz.tags[k].length; i++){
                if($scope.quiz.tags[k].charAt(i)==" ");
                else{
                    $scope.quiz.tags[k] = $scope.quiz.tags[k].substring(i);
                    break;
                }
            }
        }
    }

    function selecionarTipoQuiz(tipo) {
        for (e in $scope.opened) {
            if (e == tipo) {
                $scope.opened[e] = !$scope.opened[e];
                $scope.quiz.modalidade = tipo;                
            }
            else
                $scope.opened[e] = false;
        }
    }
}