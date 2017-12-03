app.service('tagService', tagService);

function tagService($http, URL) {
    let url = URL;
    
    
    function getTags() {
        return $http.get(`${url}/quizzes/tag`);
    }

    function getTag(tag) {
        return $http.get(`${url}/quizzes/tag/${JSON.stringify(tag)}`)
    }

    function checarTags(tags, qid){
        getTags().then(
            (tagsBanco)=>{
                let tagsBD = tagsBanco.data;
                for(var i = 0; i < tags.length; i++){
                if(!contem(tags[i], tagsBD))
                    criarTag(angular.copy(tags[i])).then((response)=>{
                        relacionarQuizTag(response.data.insertId, qid);
                    })
                else
                    relacionarQT(tags[i], qid)
            }
        });
    }

    function relacionarQuizTag(tid, qid){
        let QTag = {
            'id_tag': tid,
            'id_quiz': qid
        }
        criarQT(QTag);
    }

    function relacionarQT(tag, qid){
        getTag({
            "tag": tag,
            "id_tag": 0
        }).then((res)=>{
            let QTag = {
                'id_tag': res.data[0].id_tag,
                'id_quiz': qid
            }
            criarQT(QTag);
        })
    }

    function criarQT(QTag){
        getTagsDoQuiz(QTag.id_quiz).then((res) => {
            var existe = false;
            for(var i = 0; i < res.data.length; i++){
                if(res.data[i] == QTag){
                    existe = true;
                }
            }
            if(!existe)
                return $http.post(`${url}/quizzes/QTags/`, QTag);
        });
    }

    function criarTag(tag){
        return $http.post(`${url}/quizzes/tag/`, JSON.stringify({tag}));
    }

    function getTagsDoQuiz(qid){
        return $http.get(`${url}/quizzes/QTags/${qid}`);
    }

    function contem(tag, tagsBD) {
        for (var i = 0; i < tagsBD.length; i++) {
            if (tagsBD[i].tag === tag) {
                return true;
            }
        }
        return false;
    }

    return {
        getTags: getTags,
        checarTags: checarTags,
        getQT: getTagsDoQuiz,
        getTag: getTag
    }
}