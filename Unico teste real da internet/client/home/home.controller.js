app.controller('homeController', homeController);

function homeController($scope, quizService, usuarioService, authService) {  
    $scope.logged = authService.isLogado();
    var quizzes = ["oi"];
    let i = 0;
    let id = 0;
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
        while(contem(id, idsUsados)||id==0){
            id = Math.floor(Math.random()*(quizData.length)+1);
        }
        idsUsados[i+1] = id;
        quizService.getQuiz(id).then(mostrarQuiz).finally(getAutor);  
    }

    function getAutor(){
        usuarioService.getUsuarioPorId(quizzes[i].id_usuario).then(assimilarAutor).finally(proximoQuiz);
    }

    function mostrarQuiz(quiz){
        quizzes[i] = quiz.data[0];
    }

    function proximoQuiz(){
        i++;
        if(quizzes.length==4){
            $scope.quizzes = quizzes;
        }else{
            quizSorting();
        }
    }

    function assimilarAutor(user){
        quizzes[i].autor = user.data[0];
    }

    function contem(id, idsUsados) {
        for (var i = 0; i < idsUsados.length; i++) {
            if (idsUsados[i] === id) {
                return true;
            }
        }
        return false;
    }
}