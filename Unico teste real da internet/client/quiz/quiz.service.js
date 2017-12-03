app.factory("quizService", quizService);

function quizService($http, URL, tagService, $location) {
    var url = `${URL}`;
    var Pontuacao = 0;

    function getQuiz(id) {
        return $http.get(`${url}/quizzes/${id}`);
    }

    function getQuizzes(nPagina){
        return $http.get(`${url}/quizzes/pagina/${nPagina}`);
    }    

    function getAllQuizzes(){
        return $http.get(`${url}/quizzes`);
    }

    function getQuizzesDoUsuario(idUsuario, nPagina) {
        return $http.get(`${url}/quizzes/user/${idUsuario}/${nPagina}`);
    }

    function buscarQuiz(quizQuery, nPagina){
        return $http.get(`${url}/quizzes/busca/${quizQuery}/${nPagina}`);
    }

    function criarQuiz(quizObj) {
        var quiz = {
            "id_usuario": quizObj.id_usuario,
            "id_modalidade": quizObj.id_modalidade,
            "titulo": quizObj.titulo,
            "resumo": quizObj.resumo,
            "url_foto": quizObj.url_foto
        }
        insertQuiz(quiz).then(
            (response)=>
            {
                tagService.checarTags(quizObj.tags, response.data.insertId);
                criarPerguntas(response.data.insertId, quizObj.perguntas)
            }
            ,(fail) => console.log(fail)
        ).finally();
    }

    function insertQuiz(quiz){
        return $http.post(`${url}/quizzes`, quiz)
    }

    function criarPerguntas(id_quiz, perguntas){
        var pergunta = {
            'id_quiz': '',
            'descricao': '',
            'nPergunta': 0
        };
        for(var i = 0; i < perguntas.length; i++){
            pergunta.descricao = perguntas[i].pergunta;
            pergunta.id_quiz = id_quiz;
            pergunta.nPergunta = i+1;
            var respostas = perguntas[i].respostas;
            insertPergunta(angular.copy(pergunta)).then(
                (response)=>
                {
                    criarRespostas(response.data.insertId, respostas)
                }
                ,(fail) => console.log(fail)
            );
        }
    }

    function insertPergunta(pergunta){
        return $http.post(`${url}/quizzes/${pergunta.id_quiz}/perguntas`, pergunta)
    }

    function criarRespostas(id_pergunta, respostas){
        var resposta = {
            'id_pergunta': id_pergunta,
            'texto': '',
            'nota': 0,
        }
        for(var k = 0; k < respostas.length; k++){
            resposta.id_pergunta = id_pergunta;
            resposta.texto = respostas[k].resposta;
            resposta.nota = respostas[k].nota;
            insertResposta(angular.copy(resposta)).then(
                (response)=>
                {    
                }
                ,(fail) => console.log(fail)
            );
        }
    }

    function insertResposta(resposta){
        return $http.post(`${url}/quizzes/1/perguntas/1/respostas`, resposta);
    }


    function buscarQuizPorTag(tagQuery, nPagina){
        return $http.get(`${url}/quizzes/tag/${JSON.stringify(tagQuery)}/${nPagina}`); 
    }

    let resultados = [];

    return {
        criarQuiz: criarQuiz,
        getQuiz: getQuiz,
        getQuizzes: getQuizzes,
        getQuizzesDoUsuario: getQuizzesDoUsuario,
        getAllQuizzes: getAllQuizzes,
        buscarQuiz: buscarQuiz,
        buscarQuizPorTag: buscarQuizPorTag,
        resultados: resultados,
    }

}