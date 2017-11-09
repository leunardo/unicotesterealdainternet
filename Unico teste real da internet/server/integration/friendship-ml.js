const spawn = require('child_process').spawn;
const path = '../../friendship-ml/proximidade.py';
const userService = require('../service/userService');
const tagService = require('../service/tagService');
const quizService = require('../service/quizService');
// const process = spawn('python3', [path]);

let output = '';

function montarDados (usuario, callback) {
    let dado = [usuario];
    userService.amigos(usuario, (amigos) => {
        dado.push(amigos);
        quizService.quizzesRespondidos(usuario, (quizzes) => {
            dado.push(quizzes);
            quizService.quizzesFeitos(usuario, (quizzes) => {
                dado.push(quizzes);
                quizService.dispose();
                tagService.buscarTagsUsuario(usuario, (tags) => {
                    dado.push(tags);
                    callback(dado);
                    tagService.dispose();
                })
            })
        })
    })
}

montarDados(12, (dado) => console.log(dado));
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
