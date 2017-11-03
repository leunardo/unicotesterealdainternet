from collections import defaultdict


class User:
    """Essa classe é uma abstracao de um usuario.

    amigos_em_comum: Um set de ids de usuarios que sao amigos do usuario. \n
    quizzes_respondidos: Um set de ids de quizzes que o usuario respondeu. \n
    meus_quizzes: Um set de ids de quizzes que o usuario criou. \n
    tags: Um set de ids de tags em que o usuario participou. \n
    somatorio_quizzes: Um set que contem meus_quizzes e quizzes_repondidos."""

    def __init__(self, uid, amigos, quizzes_respondidos, meus_quizzes, tags):

        self.uid = uid
        self.amigos = set(amigos)
        self.quizzes_respondidos = set(quizzes_respondidos)
        self.meus_quizzes = set(meus_quizzes)
        self.tags = defaultdict(int)

        for tag, n in tags.items():
            self.tags[tag] += n

    def amigos_em_comum(self, user):
        # Retorna os amigos em comum entre dois usuarios.
        return self.amigos.intersection(user.amigos)

    def quizzes_em_comum(self, user):
        # Retorna os quizzes em comum entre dois usuarios
        return self.somatorio_quizzes.intersection(user.somatorio_quizzes)

    def tags_em_comum(self, user):
        # Retorna as tags em comum entre dois usuarios
        tags_em_comum = defaultdict(int)
        for tag, n in user.tags.items():
            if tag in self.tags:
                tags_em_comum[tag] += n
        return tags_em_comum


    @property
    def somatorio_quizzes(self):
        user_quiz = set(self.quizzes_respondidos)
        user_quiz.update(self.meus_quizzes)
        return user_quiz
