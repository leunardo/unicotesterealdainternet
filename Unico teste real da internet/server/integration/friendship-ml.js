const spawn = require('child_process').spawn;
const path = '../../friendship-ml/proximidade.py';
const UserService = require('../service/userService');
const DB = require('../factory/dbConnectionFactory')
const TagService = require('../service/tagService');
const QuizService = require('../service/quizService');
const process = spawn('python3', [path]);

class Friendship {

    constructor (idUsuario = 0) {
        this._db = new DB();
        this._tagService = new TagService(this._db);
        this._userService = new UserService(this._db);
        this._quizService = new QuizService(this._db);
        this._usuario = idUsuario;
    }

    /**
     * Monta um array contendo os dados de um usuário.
     * @param {*} usuario: Usuario aos quais os dados serão montados.
     * @param {*} callback: Função executada após todas as informações serem pegas.
     * @returns {Array} dados do usuario, no formato: [id, amigos, quizzes respondidos, quizzes feitos, tags]
     */
    _montarDados(usuario, callback) {
        let dado = [usuario];
        this._userService.amigos(usuario, (amigos) => {
            dado.push(amigos);
            this._quizService.quizzesRespondidos(usuario, (quizzes) => {
                dado.push(quizzes);
                this._quizService.quizzesFeitos(usuario, (quizzes) => {
                    dado.push(quizzes);
                    this._tagService.buscarTagsUsuario(usuario, (tags) => {
                        dado.push(tags);
                        callback(dado);
                    })                    
                })
            })
        })
    }

    meusDados(callback) {
        this._montarDados(this._usuario, callback);
    }
    
    buscarCombinacoes(callback) {
        this._userService.sugestaoAmigos(this._usuario, (possiveisAmigos) => {
            let combinacoes = [];
            let amizade = new Friendship();
            let nCombinacoes = possiveisAmigos.length;

            if (nCombinacoes == 0) callback(combinacoes);
            for(let i = 0; i < nCombinacoes; i++) {
                amizade._montarDados(possiveisAmigos[i], (res) => {
                    combinacoes.push(res);

                    if (nCombinacoes == i + 1)
                        callback(combinacoes);
                });
            }
        });        
    }
}

function amigosSugeridos(idUsuario, callback) {
    let amizade = new Friendship(idUsuario);
    let output = '';
    amizade.meusDados(dados => { 
        process.stdin.write(JSON.stringify(dados) + '\n')
        amizade.buscarCombinacoes(data => { 
            process.stdin.write(JSON.stringify(data)); 
            process.stdin.end();
        })
    })
    
    process.stdout.on('data', data => output += data.toString());
    process.stderr.on('data', (data) => output += data.toString());
    process.stdout.on('end', () => callback(output));
    
}

module.exports = amigosSugeridos;

amigosSugeridos(12, (r) => console.log(r));