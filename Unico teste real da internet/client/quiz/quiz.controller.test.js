app.controller("quizController", function($scope, quizService, usuarioService, authService, $location, $routeParams){
    let pergunta = 1;
    $scope.parte = 1;

    let id = $routeParams.id;   
    
    if(logado()){
        getQuiz();
    }

    function getQuiz() {
        quizService.getQuiz(id).then((data) => {
            let d = data.data;
            $scope.quiz = angular.copy({
                "titulo": d[0].titulo,
                "resumo": d[0].resumo,
                "url_foto": d[0].url_foto,
                "id_quiz": d[0].id_quiz,
                "id_modalidade": d[0].id_modalidade,
                "autor": {
                    "nome": d[0].nome,
                    "id_usuario": d[0].id_usuario,
                    "url_foto": d[0].foto
                },
                "tags": []
            })
            for(var i = 0; i < d.length; i++){
                $scope.quiz.tags[i] = d[i].tags;
            } 
            usuarioService.getUsuarioPorId(JSON.parse(localStorage.usuario).id).then((data) => {
                $scope.usuario = data.data[0];
            })
        }).finally( () => {
            $scope.$apply;
        })
    }

    function logado(){
        if(authService.isLogado()){
            return true;
        }else{
            alertify.alert("Faça login para continuar!");
            $location.path("index");
            return false;
        }
    }

    $scope.proximaParte = function (){
        $scope.parte++;
        getPergunta();
        console.log($scope.pergunta);
    }

    function getPergunta(){
        quizService.getPergunta(pergunta, $scope.quiz.id_quiz).then((d) => {
            console.log(d.data[0].id_pergunta)
            quizService.getRespostas(d.data[0].id_pergunta, $scope.quiz.id_quiz).then((c) => {
                $scope.pergunta = {
                    "pergunta": d.data[0].descricao,
                    "resposta": c.data
                }
                console.log($scope.pergunta)
            });
        });
    }
    
    function selecionarResposta(){
        pergunta++;
        getPergunta();
    }

});