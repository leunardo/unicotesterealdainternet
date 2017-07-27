app.directive('criarQuiz', criarQuiz);

function criarQuiz() {
    return {        
        templateUrl: function(element, attrs) {
            if(attrs.parte === '1')
                return 'criacaoQuiz/parte1.html';
            else 
                return 'criacaoQuiz/parte2.html';
        }
    }     
}
