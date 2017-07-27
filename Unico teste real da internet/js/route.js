app.config(function ($routeProvider){
    $routeProvider
        .when("/index", {
            controller: "homeController",
            templateUrl: "home/home.html"
        })        
        .when("/quiz/:id" , {
            controller: "quizController",
            templateUrl: "quiz/quiz.html"
        })
        .when("/resultado" , {
            controller: "resultadoController",
            templateUrl: "resultado/resultado.html"
        })
        .when("/ranking", {
            controller: "rankingController",
            templateUrl: "ranking/ranking.html"
        })
        .when("/criar", {
            controller: "criacaoQuizController",
            templateUrl: "criacaoQuiz/criacaoQuiz.html"
        })
        .when("/quizzes", {
            controller: "quizMenuController",
            templateUrl: "quizMenu/quizMenu.html"
        })
        .when("/perfil/:id", {
            controller: "perfilController",
            templateUrl: "usuario/perfil.html"
        })
        .otherwise({redirectTo: "/index"});
});