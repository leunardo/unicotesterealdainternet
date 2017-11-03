import numpy as np
from user import User


def calcular_proximidade(usuario_1, usuario_2):
    """Calcula a proximidade entre um usuario e outro.

    :param usuario_1: Usuario 1.
    :param usuario_2: Usuario 2.
    :return: Um ponto flutuante representando a proximidade dos dois usuarios.
    """

    amigos = usuario_1.amigos_em_comum(usuario_2)
    quizzes = usuario_1.quizzes_em_comum(usuario_2)
    tags = usuario_1.tags_em_comum(usuario_2)
    valores_tags = list(tags.values()) or 0

    proximidade = (len(amigos) ** 1.5 +  np.mean(valores_tags) + len(quizzes)) / 10
    return proximidade


def calcular_softmax(usuario_principal, usuarios):
    """Calcula a funcao softmax entre o usuario e outros usuarios.

    :param usuario_principal: usuario que sera comparado com varios usuarios.
    :param usuarios: varios usuarios utilizados para comparacao
    :return: Uma lista contendo um numero representando a proximidade do usuario principal com outro usuario.
    """

    lista_proximidade = [calcular_proximidade(usuario_principal, usuario) for usuario in usuarios]
    return np.exp(lista_proximidade) / np.sum(np.exp(lista_proximidade), axis=0)


if __name__ == '__main__':
    """Executa o arquivo e roda amostras de teste."""
    leo = User(1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [], [10, 20, 30, 40, 50, 60, 70, 80], {"arroz": 4, "feijao": 3, "c": 2})
    bruno = User(2, [2], [10, 20, 30, 40], [], {"arroz": 2, "feijao": 3, "batata": 6})
    airton = User(3, [2, 3], [10, 20, 30, 40, 50, 60, 70], [], {"arroz": 8, "feijao": 3, "batata": 6})
    pablo = User(4, [2, 3, 4], [10, 20, 30], [], {"arroz": 2, "feijao": 3, "batata": 6})
    juck = User(5, [2, 3, 4], [10, 20, 30, 40], [], {"arroz": 2, "feijao": 3, "batata": 6})
    jose = User(6, [2, 3, 4, 5, 6], [], [], {"calabresa": 3,  "sucao": 6})
    users = [bruno, jose, airton, pablo, juck]
    resultado = calcular_softmax(leo, users)

    print(list(zip([user.uid for user in users], resultado)))