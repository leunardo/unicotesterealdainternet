app.controller('homeController', homeController);

function homeController($scope, quizService, usuarioService, authService, tagService) {  
    $scope.logged = authService.isLogado();
    let quizzes = ["oi"];
    let id = 0;
    let i = 0;
    let idsUsados = [0];
    let quizData = [];
    getQuizzes();
    

    function getQuizzes(){
        quizService.getAllQuizzes().then(getRandomQuizzes);
    }
    
    function getRandomQuizzes(quizList){
        quizData = quizList.data;
        if(quizData.length>4){
            quizSorting();
        }
        else{
            $scope.quizzes = quizData;
        }
    }

    function quizSorting(){
        for(var i = 0; i < 4; i++){
            while(contem(id, idsUsados)||id==0){
                id = Math.floor(Math.random()*(quizData.length)+1);
            }
            idsUsados[i+1] = id;
            quizService.getQuiz(id).then(mostrarQuiz);  
        }
    }

    function mostrarQuiz(quiz){
        quizzes[i] = angular.copy(quiz.data[0]);
        quizzes[i].tags = [];
        pegarTags(quiz);
        i++;
        if(quizzes.length == 4){
            $scope.quizzes = quizzes;
        }
    }

    function pegarTags(quiz){
        if(quiz.data[0].tags != null)
            for(var k = 0; k < quiz.data.length; k++){
                quizzes[i].tags[k] = {
                    "tag": quiz.data[k].tags,
                    "id_tag": quiz.data[k].id_tag
                };
            }
        else
            quizzes[i].tags = null;
    }
/*
    function getAutorETags(){
        usuarioService.getUsuarioPorId(quizzes[i].id_usuario).then(assimilarAutor).finally(pegarQT);
    }

    function assimilarAutor(user){
        quizzes[i].autor = user.data[0];
    }

    function pegarQT(){
        tagService.getQT(quizzes[i].id_quiz).then(pegarTags);
    }

    function pegarTags(QTags){
        if(QTags.data.length > 0)
            tagService.getTag({
                "tag": '',
                "id_tag": QTags.data[k].id_tag
            }).then(
                (tagData) => {
                    quizzes[i].tags[k] = tagData.data[0];
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
            quizzes[i].tags = null;
            proximo();
        }
    }

    function proximo(){
        k=0;
        i++;
        if(quizzes.length==4){
            $scope.quizzes = quizzes;
        }else{
            quizSorting();
        }
    }
*/
    function contem(id, idsUsados) {
        for (var i = 0; i < idsUsados.length; i++) {
            if (idsUsados[i] === id) {
                return true;
            }
        }
        return false;
    }
}