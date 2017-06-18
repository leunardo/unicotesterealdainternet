app.config(function ($routeProvider){
    $routeProvider
        .when("/index", {
            controller: "homeController",
            templateUrl: "home/home.html"
        })        
        .when("/quiz" , {
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
        .otherwise({redirectTo: "/index"});
});