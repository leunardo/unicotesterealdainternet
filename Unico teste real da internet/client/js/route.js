app.config(function ($routeProvider) {
    $routeProvider
        .when("/index", {
            controller: "homeController",
            templateUrl: "home/home.html"
        })
        .when("/quiz/:id", {
            controller: "quizController",
            templateUrl: "quiz/quiz.html",
            controllerAs: "quizCtrl"
        })
        .when("/resultado", {
            controller: "resultadoController",
            templateUrl: "resultado/resultado.html"
        })
        .when("/ranking", {
            controller: "rankingController",
            templateUrl: "ranking/ranking.html"
        })
        .when("/criar", {
            controller: "criacaoQuizController",
            templateUrl: "criacaoQuiz/criacaoQuiz.html",
            controllerAs: "createCtrl"
        })
        .when("/quizzes", {
            controller: "quizMenuController",
            templateUrl: "quizMenu/quizMenu.html"
        })
        .when("/perfil/:id", {
            controller: "perfilController",
            templateUrl: "usuario/perfil.html"
        })
        .when("/busca/:q", {
            controller: "searchController",
            templateUrl: "search/search.html"
        })
        .when("/tag/:q", {
            controller: "searchController",
            templateUrl: "search/search.html"
        })
        .otherwise({
            redirectTo: "/index"
        });
});