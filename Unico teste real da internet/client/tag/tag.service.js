app.service('tagService', tagService);

function tagService($http, URL) {
    let url = URL;
    
    
    function getTags() {
        return $http.get(`${url}/quizzes/tag`);
    }

    function checarTags(tags, qid){
        getTags().then(
            (tagsBanco)=>{
                let tagsBD = tagsBanco.data;
                for(var i = 0; i < tags.length; i++){
                if(!contem(tags[i], tagsBD))
                    criarTag(angular.copy(tags[i])).then(relacionarQuizTag)
                else
                    relacionarQuizTag(tags[i])
            }
        });


    }

    function criarTag(tag){
        return $http.post(`${url}/quizzes/tag/`, JSON.stringify({ tag }));
    }

    function relacionarQuizTag(tagResponse){
        return $http.post(`${url}/quizzes/${qid}/tags`, tagResponse.data.insertId)
    }

    function getTagsDoQuiz(qid){
        return $http.get(`${url}/quizzes/${qid}/tags`);
    }

    function contem(id, idsUsados) {
        for (var i = 0; i < idsUsados.length; i++) {
            if (idsUsados[i] === id) {
                return true;
            }
        }
        return false;
    }

    return {
        getTags: getTags,
        checarTags: checarTags
    }
}