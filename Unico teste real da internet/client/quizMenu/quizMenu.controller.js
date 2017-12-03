app.controller('quizMenuController', quizMenuController);
function quizMenuController($scope, quizService, usuarioService, tagService){
    $scope.proximaPagina = proximaPagina;
    $scope.retornarPagina = retornarPagina;
    $scope.nPagina = 1;
    var i = 0;
    var k = 0;
    getQuizzes();

    function getQuizzes(){
        quizService.getQuizzes($scope.nPagina).then(mostrarQuizzes);    
    }

    function mostrarQuizzes(quizList){
        if(quizList.data.length > 0){
            $scope.quizzes = quizList.data;
            getAutorETags();
        }
        else if($scope.nPagina!=1){
            $scope.nPagina--;
            alertify.alert('Não existem mais quizzes para carregar.');
        }else{
            $scope.mensagem = "Não possuimos nenhum quiz no momento, contribua e faça história criando o primeiro!";
        }
    }

    function getAutorETags(){
        usuarioService.getUsuarioPorId($scope.quizzes[i].id_usuario).then(assimilarAutor).finally(pegarQT);
    }

    function proximo(){
        i++;
        k = 0;
        if($scope.quizzes[$scope.quizzes.length-1].autor == undefined)
            getAutorETags();
    }


    function assimilarAutor(user){
        $scope.quizzes[i].autor = user.data[0];
    }


    function pegarQT(){
        tagService.getQT($scope.quizzes[i].id_quiz).then(pegarTags);
    }

    function pegarTags(QTags){
        if(QTags.data.length > 0)
            tagService.getTag({
                "tag": '',
                "id_tag": QTags.data[k].id_tag
            }).then(
                (tagData) => {
                    if($scope.quizzes[i].tags == undefined)
                        $scope.quizzes[i].tags = [];
                    $scope.quizzes[i].tags[k] = tagData.data[0];
                }
            ).finally(
                ()=>{
                    if(k == QTags.data.length - 1){
                            proximo();
                    }else{
                        k++;
                        pegarTags(QTags);
                    }
                }
            );
        else{
            $scope.quizzes[i].tags = null;
            proximo();
        }
    }

    function proximaPagina(){
        $scope.nPagina++;
        i=0;
        getQuizzes();

    }

    function retornarPagina(){
        if($scope.nPagina >= 2){
            i = 0;
            $scope.nPagina--;
            getQuizzes();
        }
    }
}