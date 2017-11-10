const spawn = require('child_process').spawn;
const path = '../../friendship-ml/proximidade.py';
const UserService = require('../service/userService');
const DB = require('../factory/dbConnectionFactory')
const TagService = require('../service/tagService');
const QuizService = require('../service/quizService');
const process = spawn('python3', [path]);

class Friendship {

    constructor () {
        this._db = new DB();
        this._tagService = new TagService(this._db);
        this._userService = new UserService(this._db);
        this._quizService = new QuizService(this._db);
    }

    /**
     * Monta um array contendo os dados de um usuário.
     * @param {*} usuario: Usuario aos quais os dados serão montados.
     * @param {*} callback: Função executada após todas as informações serem pegas.
     * @returns {Array} dados do usuario, no formato: [id, amigos, quizzes respondidos, quizzes feitos, tags]
     */
    montarDados(usuario, callback) {
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
                        this._db.dispose();
                    })
                    
                })
            })
        })
    }


}
let amizade = new Friendship();

amizade.montarDados(12, (dados) => console.log(dados));
// montarDados(12, (dado) => console.log(dado));
// function buscarCombinacoes(idUsuario) {
//     let possiveisAmigos = userService.sugestaoAmigos(idUsuario);
//     for(usuario of possiveisAmigos) {
        
//     }

// }


// process.stdout.on('data', (data) => output += data.toString());
// process.stderr.on('data', (data) => output += data.toString());
// process.stdout.on('end', () => console.log(output));

// process.stdin.write("Hello world");
// process.stdin.write("Ola mundo");
// process.stdin.write("hehe xd");
// process.stdin.end();
// process.stdin.write(JSON.stringify)
