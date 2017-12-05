app.controller('criacaoQuizController', function (authService, $location, quizService) {
    this.opened = {
        'pessoal': false,
        'pontuacao': false,
        'generico': false
    }
    this.parteQuiz = '1';
    this.proximaPergunta = proximaPergunta;
    this.adicionarResposta = adicionarResposta;
    this.removerResposta = removerResposta;
    this.proximaParte = proximaParte;
    this.publicar = publicar;
    this.selecionarTipoQuiz = selecionarTipoQuiz;
    this.proximoResultado = proximoResultado;
    this.alterarRadio = alterarRadio;
    let resultadoCopia = [];
    let fim = false;
    let respostaI = 0;
    checarSeLogado();

    this.instanciarQuiz = function () {
        this.form.quiz = {
            titulo: '',
            url_foto: null,
            resumo: '',
            perguntas: [],
            resultado: [],
            tags: [],
            modalidade: 0
        };
        this.form.perguntaTemp = {
            pergunta: '',
            respostas: []
        };
        this.form.range = {
            min: 1,
            max: 0
        };
        this.form.resultado = {
            resultado: '',
            range: '',
            foto: '',
            explicacao: ''
        };
    }

    function checarSeLogado() {
        if (authService.isLogado()) {
            return;
        } else {
            alertify.alert("Faça login para continuar!");
            $location.path("index");
        }
    }

    function alterarRadio(index) {
        for (let i = 0; i < this.form.perguntaTemp.respostas.length; i++) {
            if (i != index) {
                this.form.perguntaTemp.respostas[i].nota = 0;
            } else {}
        }
    }

    this.modalidadePessoal = function modalidadePessoal() {
        return this.form.quiz.modalidade === 'pessoal';
    }

    this.modalidadePontuacao = function modalidadePontuacao() {
        return this.form.quiz.modalidade === 'pontuacao';
    }

    this.modalidadeGenerica = function modalidadeGenerica() {
        return this.form.quiz.modalidade === 'generico';
    }

    function adicionarResposta(resposta) {
        if (resposta.length < 3) return;
        this.form.perguntaTemp.respostas[respostaI] = {
            "resposta": angular.copy(resposta),
            "nota": 0
        };
        respostaI++;
        this.form.respostaInsert = '';
    }

    function checarSeTodaLacunaDeNotaERepresentadaPelosRanges() {
        for (let i = 0; i < this.form.quiz.resultado.length; i++) {
            let rangeMax = this.form.quiz.resultado[i].range.split('-')[1];
            if (rangeMax == this.form.quiz.perguntas.length) {
                return true;
            }
        }
        alertify.alert("Você ainda não fez resultados para todas as notas possiveis.");
        return false;
    }

    function publicar() {
        if ((this.parteQuiz == 2 && this.form.quiz.perguntas.length > 6) || (this.parteQuiz == 3 && this.form.quiz.resultado.length > 1 && angular.bind(this, checarSeTodaLacunaDeNotaERepresentadaPelosRanges))) {
            let usuario = JSON.parse(localStorage.usuario);
            this.form.quiz.id_usuario = usuario.id_usuario;
            if (this.parteQuiz == 2) {
                angular.bind(this, proximaPergunta);
            } else if (this.parteQuiz == 3 && !fim) {
                angular.bind(this, proximoResultado);
            }
            this.form.quiz.usuariosQueResponderam = [];
            if (this.form.quiz.modalidade != "generico") {
                this.form.quiz.top3 = [];
            }
            quizService.criarQuiz(this.form.quiz);
            alertify.alert("Quiz criado com sucesso. Redirecionando para home.")
        }
    }

    function proximaPergunta() {
        if (this.form.perguntaTemp.respostas.length < 2) return;
        if (this.form.perguntaTemp.$invalid) return;
        let copia = {
            "pergunta": angular.copy(this.form.perguntaTemp.perguntaTemp),
            "respostas": angular.copy(this.form.perguntaTemp.respostas),
        };
        this.form.quiz.perguntas.push(copia);
        this.form.perguntaTemp = {
            pergunta: '',
            respostas: []
        };
        this.form.respostaInsert = '';
        respostaI = 0;
    }

    function proximoResultado() {
        if (this.form.resultado.$invalid || this.form.range.$invalid ||
            this.form.fotoResultado.$invalid || this.form.explicacao.$invalid) return;
        if (this.form.range.max === this.form.quiz.perguntas.length && this.form.quiz.resultado.length == 0) {
            alertify.alert("Com um range assim (" + range.min + "-" + range.max + "), o quiz só teria um resultado. Diminua o máximo do range em ao menos 1.");
            return;
        }
        if (this.form.quiz.resultado.length == 0) {
            resultadoCopia = {
                resultado: this.form.resultado.resultado,
                range: "" + (this.form.range.min - 1) + "-" + this.form.range.max,
                foto: this.form.resultado.foto,
                explicacao: this.form.resultado.explicacao,
            };
        } else {
            resultadoCopia = {
                resultado: this.form.resultado.resultado,
                range: "" + this.form.range.min + "-" + this.form.range.max,
                foto: this.form.resultado.foto,
                explicacao: this.form.resultado.explicacao,
            };
        }
        this.form.quiz.resultado.push(resultadoCopia);
        if (this.form.range.max == this.form.quiz.perguntas.length) {
            alertify.alert("Não é possivel criar mais resultados, publicando quiz.");
            fim = true;
            angular.bind(this, publicar);
        } else {
            this.form.range.min = this.form.range.max + 1;
            this.form.range.max = 0;
            this.form.resultado = {
                resultado: '',
                range: '',
                foto: '',
                explicacao: ''
            }
        }
    }

    function removerResposta(indice) {
        this.form.perguntaTemp.respostas.splice(indice, 1);
    }

    function proximaParte() {
        if (this.form.$valid && this.parteQuiz == 1 && this.form.quiz.modalidade != '') {
            this.removerEspacosDasTags();
            this.form.quiz.id_modalidade = (this.form.quiz.modalidade == 'generico') ? 3 : (this.form.quiz.modalidade == 'pontuacao') ? 2 : 1;
            this.parteQuiz++;
        } else if (this.parteQuiz == 2 && this.form.quiz.perguntas.length > 6) {
            angular.bind(this, proximaPergunta);
            this.parteQuiz++;
            this.form.range.max = this.form.quiz.perguntas.length;
        } else if (this.parteQuiz == 2 && this.form.quiz.perguntas.length <= 6) {
            alertify.alert("Seu quiz precisa ter ao menos 7 perguntas. Você só fez " + this.form.quiz.perguntas.length + " perguntas até agora.");
        }
    }

    this.removerEspacosDasTags = function () {
        this.form.quiz.tags = this.form.quiz.tags.split(',')
        for (let k = 0; k < this.form.quiz.tags.length; k++) {
            for (let i = 0; i < this.form.quiz.tags[k].length; i++) {
                if (this.form.quiz.tags[k].charAt(i) == " ");
                else {
                    this.form.quiz.tags[k] = this.form.quiz.tags[k].substring(i);
                    break;
                }
            }
        }
        if (typeof (this.form.quiz.tags) == 'string')
            this.form.quiz.tags = [angular.copy(this.form.quiz.tags)];
    }

    function selecionarTipoQuiz(tipo) {
        for (e in this.opened) {
            if (e == tipo) {
                this.opened[e] = !this.opened[e];
                this.form.quiz.modalidade = tipo;
            } else
                this.opened[e] = false;
        }
    }
})