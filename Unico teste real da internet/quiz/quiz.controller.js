app.controller("quizController", quizController);

function quizController($scope, quizService, $location) {
    $scope.questoes = [];
    $scope.nPergunta = 0;
    $scope.avancarPergunta = avancarPergunta;
    $scope.retrocederPergunta = retrocederPergunta;

    getUsuarios();
    getPergunta();

    function getPergunta() {
        quizService.getPergunta().then(
            c => {
                $scope.questoes = c.data;
                mostrarPergunta($scope.nPergunta);
            },
            error => {
                alert("Não foi possivel encontrar as perguntas");
            });
    }

    function mostrarPergunta(nPergunta) {
        $scope.questao = $scope.questoes[nPergunta];
    }

    function avancarPergunta() {
        if ($scope.nPergunta < $scope.questoes.length - 1) {
            $scope.nPergunta++;
            mostrarPergunta($scope.nPergunta);
        } else {
            encerrarQuiz();
        }
    }

    function encerrarQuiz() {
        alert("Parabéns! Você terminou o Unico Teste (DE QI) Real da Internet")
        if (existeUsuario()) {
            var usuario = $scope.usuarios
                .find(u => u.Nome === localStorage.nome);
            quizService.getQI = usuario.QI;
        } else {
            salvarUsuario();
        }
        $location.path("/resultado");
    }

    function getUsuarios() {
        quizService.getUsuario().then(r => {
            $scope.usuarios = r.data;
        }, e => {
            alert("erro")
        });
    }

    function existeUsuario() {
        return !!$scope.usuarios
            .filter(u => u.Nome.toUpperCase() === localStorage.nome.toUpperCase())
            .length;
    }

    function salvarUsuario() {
        quizService.getQI = Math.trunc(Math.random() * 200 * 1.5);
        var usuario = {
            Nome: localStorage.nome,
            QI: quizService.getQI
        }
        quizService.criarUsuario(usuario);
    }

    function retrocederPergunta() {
        $scope.nPergunta--;
        mostrarPergunta($scope.nPergunta);
    }
    
}