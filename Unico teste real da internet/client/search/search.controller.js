app.controller('searchController', searchController);
app.controller('searchHeaderController', searchHeaderController);

function searchHeaderController($scope, $location){
    $scope.query = "";
    $scope.buscar = buscarQuiz;
    $scope.buscarTag = buscarTag;

    function buscarTag(){
        $scope.buscar = buscarQuizTag;
        $scope.query = $scope.query.replace(/, /g, ',');
    }    

    function buscarQuiz(query){          
        $location.path(`busca/${query}`);
        $scope.query = "";
    }

    function buscarQuizTag(query){
        $location.path(`tag/${query}`)        
        $scope.buscar = buscarQuiz;
        $scope.query = "";
    }
}

function searchController($scope, quizService, usuarioService, $routeParams, $location, tagService) {
    let query = $routeParams.q;
    $scope.proximaPagina = proximaPagina;
    $scope.retornarPagina = retornarPagina;
    $scope.nPagina = 1;
    var i = 0;
    var k = 0;
    let url = $location.path().split('/')[1];
    getQuizzes();

    function getQuizzes(){
        if("busca"===url){
            quizService.buscarQuiz(query, $scope.nPagina)
            .then(mostrarQuizzes);
        }
        else{
            quizService.buscarQuizPorTag(removerEspacosDasTags(query), $scope.nPagina)
            .then(mostrarQuizzes);
        }
    }

    function removerEspacosDasTags(query) {
        let tagArray = query.split(',')
        for(let j = 0; j < tagArray.length; j++){
            for(let q = 0; q < tagArray[j].length; q++){
                if(tagArray[j].charAt(q)==" ");
                else{
                    tagArray[j] = tagArray[j].substring(q);
                    break;
                }
            }
        }
        return tagArray;
    }

    function mostrarQuizzes(quizList){
        if(quizList.data.length > 0){
            $scope.quizzes = quizList.data;
            getAutorETags();
        }
        else if($scope.nPagina!=1){
            $scope.nPagina--;
            alert('Não existem mais quizzes para carregar.');
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