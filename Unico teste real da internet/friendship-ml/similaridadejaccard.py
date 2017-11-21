"""Modulo que efetua a similaridade de jaccard, e suas variantes baseadas no contexto de usuario."""
from user import User


def similaridade_jaccard(interseccao: set, uniao: set):
    return len(interseccao) / (len(uniao) or 1)


def similaridade_quizzes_feitos(user1: User, user2: User):
    quizzes_em_comum = user1.quizzes_em_comum(user2)
    uniao_quizzes = user1.mesclar_quizzes(user2)

    return similaridade_jaccard(quizzes_em_comum, uniao_quizzes)


def similaridade_amigos(user1: User, user2: User):
    amigos_em_comum = user1.amigos_em_comum(user2)
    uniao_amigos = user1.mesclar_amigos(user2)

    return similaridade_jaccard(amigos_em_comum, uniao_amigos)
