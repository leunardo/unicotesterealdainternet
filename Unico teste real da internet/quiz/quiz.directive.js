app.directive('mostrarQuiz', quizDirective);

function quizDirective() {
    return {         
        link : function(scope, elem, attr) {
            attr.$observe('parte', (n) => {
                scope.url = `quiz/parte${n}.html`;
            });
        },           
        template: `<div ng-include="url" class="caixa"></div>`     
    }         
}