const path = '../../friendship-ml/proximidade.py';
const DB = require('../factory/dbConnectionFactory');
const UserQuery = require('../query/userQuery');
const TagService = require('../service/tagService');
const QuizService = require('../service/quizService');
const spawn = require('child_process').spawn;
const process = spawn('python3', [path]);
const auth = require('../endpoint/auth');

class UserService {
    constructor() {
        this._userQuery = new UserQuery();
        this._tagService = new TagService();
        this._quizService = new QuizService();
    }

    getUsuarioPorId(id, callback) {
        this._userQuery.getUsuarioPorId(id, (result) => callback(result));
    }

    getUsuarios(callback) {
        this._userQuery.getUsuarios((result) => callback(result));
    }

    getUsuariosPorId(ids, callback) {
        this._userQuery.getUsuariosPorIds(ids, result => callback(result));
    }

    criarUsuario(user, callback) {
        this._userQuery.criarUsuario(user, (result) => callback(result));
    };

    updateUsuario(user, token, id, callback){
        auth.authenticate(token, (payload) => {
            if (user.id_google == payload['sub'])    
                this._userQuery.atualizarUsuario
                    (user.nome, user.url_foto, user.descricao, id, 
                        (result) => callback(result));
        })
    }

    usuarioJaCadastrado(gid, callback){
        this._userQuery.usuarioJaCadastrado(gid, (result) => callback(result));
    }
    
    /*
    amigosDosAmigos(idUsuario, callback) {
        this._userQuery.amigosDosAmigos(idUsuario, (result) => {
            let usuarios = [];
            for (let usuario of result) {
                usuarios.push(usuario.id_usuario2);
            }
            callback(usuarios);
        })  
    }   

    
    amigos(idUsuario, callback) {
        this._userQuery.amigos(idUsuario, (result) => {
            let usuarios = [];
            for (let usuario of result) {
                usuarios.push(usuario.id_usuario2);
            }    
            callback(usuarios);
        });
    }

    amigosSugeridos(idUsuario, callback) {
        this._calcularProximidade(idUsuario, dadosString => {
            let dados = JSON.parse(dadosString);
            let media = parseFloat(dados.media);
            let variancia = parseFloat(dados.variancia);
            let usuariosProximos = [];

            for (let proximidade of dados.resultado)
                if (proximidade[1] >= media - variancia)
                    usuariosProximos.push(proximidade[0]);            
    
            
            this.getUsuariosPorId([usuariosProximos], res => {
                this._db.dispose();
                callback(res);
            });
        })
    }

    _buscarCombinacoes(idUsuario, callback) {
        this.amigosDosAmigos(idUsuario, possiveisAmigos => {
            let combinacoes = [];
            let nCombinacoes = possiveisAmigos.length;

            if (nCombinacoes == 0) callback(combinacoes);
            for(let i = 0; i < nCombinacoes; i++) {
                this._montarDados(possiveisAmigos[i], (res) => {
                    combinacoes.push(res);

                    if (nCombinacoes == i + 1) {
                        callback(combinacoes);
                    }
                });
            }
        });        
    }

    _calcularProximidade(idUsuario, callback) {
        let output = '';
        this._montarDados(idUsuario, dados => { 
            process.stdin.write(JSON.stringify(dados) + '\n')
            this._buscarCombinacoes(idUsuario, data => { 
                process.stdin.write(JSON.stringify(data));
                process.stdin.end();
            })
        })
        
        process.stdout.on('data', data => output += data.toString());
        process.stderr.on('data', (data) => output += data.toString());
        process.stdout.on('end', () => callback(output));
        
    }
    */

    /**
     * Monta um array contendo os dados de um usuário.
     * @param {*} usuario: Usuario aos quais os dados serão montados.
     * @param {*} callback: Função executada após todas as informações serem pegas.
     * @returns {Array} dados do usuario, no formato: [id, amigos, quizzes respondidos, quizzes feitos, tags]
     */
    /*    
     _montarDados(usuario, callback) {
        let dado = [usuario];
        this.amigos(usuario, (amigos) => {
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
    */
}
module.exports = UserService;
