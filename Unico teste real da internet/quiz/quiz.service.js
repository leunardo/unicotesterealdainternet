app.factory("quizService", quizService);

function quizService($http, URL) {
    var url = `${URL}`;
    var Pontuacao = 0;

    function getQuiz(id) {
        return $http.get(`${url}/quizzes/${id}`);
    }

    function getQuizzes(nPagina){
        return $http.get(`${url}/quizzes?_page=${nPagina}&_limit=8`);
    }    

    function getAllQuizzes(){
        return $http.get(`${url}/quizzes`);
    }

    function getQuizzesDoUsuario(idUsuario, nPagina) {
        return $http.get(`${url}/quizzes/?autor.id=${idUsuario}&_page=${nPagina}&_limit=8`);
    }

    function buscarQuiz(quizQuery, nPagina){
        return $http.get(`${url}/quizzes?q=${quizQuery}&_page=${nPagina}&_limit=8`);
    }

    function buscarQuizPorTag(query, nPagina){
        let httpget = `${url}/quizzes/?_page=${nPagina}&_limit=8&`;
        let tagsAdd = "tags_like="
        let tags = query.split("&");
        for(let i = 0; i<tags.length; i++){
            httpget += tagsAdd+tags[i];
            if(tags.length != i+1){
                httpget += "&";
            }
        }
        console.log(httpget);
        return $http.get(httpget) 
    }

    let resultados = [];

    return {
        getQuiz: getQuiz,
        getQuizzes: getQuizzes,
        getQuizzesDoUsuario: getQuizzesDoUsuario,
        getAllQuizzes: getAllQuizzes,
        buscarQuiz: buscarQuiz,
        buscarQuizPorTag: buscarQuizPorTag,
        resultados: resultados,
    }

}