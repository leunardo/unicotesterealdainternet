app.controller('criacaoQuizController', criacaoQuizController);

function criacaoQuizController($scope, $location, criacaoQuizService) {
    $scope.pergunta = { pergunta: '', respostas: []};
    $scope.opened = { 'pessoal': false, 'pontuacao': false, 'generico': false }    
    $scope.quiz = {
        titulo: '', 
        foto: '',
        resumo: '',
        perguntas: [],
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

    function adicionarResposta(resposta) {  
        if($scope.perguntaForm.resposta.$invalid) return;
        $scope.pergunta.respostas.push({ resposta: resposta });        
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
        if($scope.pergunta.respostas.length < 2) return;
        if($scope.perguntaForm.pergunta.$invalid) return;
        let copia = {
            pergunta: $scope.pergunta.pergunta,
            respostas: $scope.pergunta.respostas,
        };
        $scope.quiz.perguntas.push(copia);
        $scope.pergunta = { pergunta: '', respostas: [] };
        $scope.$$childHead.resposta = '';   
    }

    function removerResposta(indice) {
        $scope.pergunta.respostas.splice(indice, 1);
    }

    function proximaParte() {
        if($scope.perguntaForm.$valid)
            $scope.parteQuiz = '2';
    }

    function removerEspacosDasTags(tags) {
        return tags.replace(/[, ]+[ ,]+/g, ',');
    }

    function selecionarTipoQuiz(tipo) {
        for(e in $scope.opened) {
            if(e === tipo) {
                $scope.opened[e] = !$scope.opened[e];
                $scope.quiz.modalidade = tipo;
            }
            else
                $scope.opened[e] = false;
        }
    }

}
