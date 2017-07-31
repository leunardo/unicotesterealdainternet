app.controller('criacaoQuizController', criacaoQuizController);

function criacaoQuizController($scope, $location, criacaoQuizService) {
    $scope.pergunta = { pergunta: '', respostas: []};    
    $scope.quiz = {
        titulo: '', 
        foto: '',
        resumo: '',
        perguntas: [],
        tags: '',
    };
    $scope.parteQuiz = '1';
    $scope.proximaPergunta = proximaPergunta;  
    $scope.adicionarResposta = adicionarResposta;
    $scope.removerResposta = removerResposta;
    $scope.proximaParte = proximaParte;
    $scope.publicar = publicar;

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

}
