import numpy as np
import json, sys
from user import User
from similaridadecossenos import similaridade_cossenos
from similaridadejaccard import similaridade_amigos, similaridade_quizzes_feitos

def calcular_proximidade(usuario_1, usuario_2):
    """Calcula a proximidade entre um usuario e outro.

    :param usuario_1: Usuario 1.
    :param usuario_2: Usuario 2.
    :return: Um ponto flutuante representando a proximidade dos dois usuarios.
    """
    quizzes = similaridade_quizzes_feitos(usuario_1, usuario_2)
    amigos  = similaridade_amigos(usuario_1, usuario_2)
    tags    = similaridade_cossenos(usuario_1.tags_em_comum(usuario_2))

    proximidade =  quizzes + amigos + tags
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
    dados = sys.stdin.readlines()
    dadosUsuario = json.loads(dados[0])
    dadosPossiveisAmigos = json.loads(dados[1])

    usuario = User(*dadosUsuario)
    possiveisAmigos = [User(*dados) for dados in dadosPossiveisAmigos]

    resultado = calcular_softmax(usuario, possiveisAmigos)
    variancia = np.var(resultado)
    media = np.mean(resultado)
    output = {"resultado": list(zip([user.uid for user in possiveisAmigos], resultado)), 
              "media": media, 
              "variancia": variancia}

    print(json.dumps(output))
