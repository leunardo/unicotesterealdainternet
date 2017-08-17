app.directive('criarQuiz', criarQuiz);

function criarQuiz() {    
    return {         
        link : function(scope, elem, attr) {
            attr.$observe('parte', (n) => {
                scope.url = `criacaoQuiz/parte${n}.html`;
            });
        },           
        template: `<div ng-include="url" class="caixa"></div>`     
    }     
}
