app.controller('perfilController', perfilController);

function perfilController($scope, $routeParams, authService, usuarioService, quizService, tagService) {
    $scope.checarUser = checarUser;
    $scope.usuario = "";
    $scope.atualizarPerfil = atualizarPerfil;
    $scope.proximaPagina = proximaPagina;
    $scope.retornarPagina = retornarPagina;
    $scope.nPagina = 1;
    $scope.editarPerfil = editarPerfil;
    $scope.fecharModal = fecharModal;
    var i = 0;
    var k = 0;
    getUsuario();

    function getUsuario() {
        usuarioService.getUsuarioPorId($routeParams.id)
            .then(response => {
                $scope.usuario = response.data[0]; 
                $scope.usuarioCopia = angular.copy($scope.usuario);
                getQuizzesDoUsuario();
            }, fail => {
                alertify.alert("Deu erro");
            });
    }

    function getQuizzesDoUsuario() {
        quizService.getQuizzesDoUsuario($routeParams.id, $scope.nPagina)
            .then(mostrarQuizzes);
    }

    function mostrarQuizzes(quizList){
        if(quizList.data.length > 0){
            $scope.quizzes = quizList.data;
            console.log($scope.quizzes);
            getTags();
        }
        else if($scope.nPagina!=1){
            $scope.nPagina--;
            alertify.alert('Não existem mais quizzes para carregar.');
        }else if (!checarUser()){
            $scope.mensagem = "Esse usuário ainda não possui quizzes. Incentive-o a criar um!";
        }else{
            $scope.mensagem = "Ei, você ainda não tem nenhum quiz :( Vai deixar todo mundo esperando!? Vamos, faz um! É fácil e divertido!"
        }
    }
    function getTags(){
        usuarioService.getUsuarioPorId($scope.quizzes[i].id_usuario).then(pegarQT);
    }

    function proximo(){
        i++;
        k = 0;

        if(i < 8)
            getTags();
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
        getQuizzesDoUsuario();

    }

    function retornarPagina(){
        if($scope.nPagina >= 2){
            i = 0;
            $scope.nPagina--;
            getQuizzesDoUsuario();
        }
    }
    
    function checarUser(){
        if(authService.isLogado()){
            return $scope.usuario.id_usuario === JSON.parse(localStorage.usuario).id_usuario;           
        }else{
            return false;
        }
    }
    function editarPerfil(){
        document.querySelector('body').style.overflow = "hidden";
        document.getElementById('modal').style.display = "block";
    }

    function fecharModal() {
        document.querySelector('body').style.overflow = "auto";
        document.getElementById('modal').style.display = "none";   
    }

    function atualizarPerfil(){
        let googleAuth = gapi.auth2.getAuthInstance();
        let googleUser = googleAuth.currentUser.get();
        let token = googleUser.getAuthResponse().id_token;

        usuarioService.atualizarPerfil($scope.usuarioCopia, token)
            .then(function response(resposta){
                $scope.usuario = angular.copy($scope.usuarioCopia);
                localStorage.usuario = JSON.stringify($scope.usuario);
            }, function erro(error) {
                console.log(error);
            });
    }
}