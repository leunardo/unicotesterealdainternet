import numpy as np
import json
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
    """Executa o arquivo e roda amostras de teste."""
    leo    = User(1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [                          ], [10, 20, 30, 40, 50, 60, 70, 80], {"arroz": 4, "feijao": 3, "c": 2})
    bruno  = User(2, [2                            ], [10, 20, 30, 40            ], [                              ], {"arroz": 2, "feijao": 3, "batata": 6, "queijo": 3})
    airton = User(3, [2, 3                         ], [10, 20, 30, 40, 50, 60, 70], [                              ], {"arroz": 8, "feijao": 3, "batata": 6})
    pablo  = User(4, [2, 3, 4                      ], [10, 20, 30                ], [                              ], {"arroz": 2, "feijao": 3, "batata": 6})
    juck   = User(5, [2, 3, 4                      ], [10, 20, 30, 40            ], [                              ], {"arroz": 2, "feijao": 3, "batata": 6})
    jose   = User(6, [2, 3, 4, 5, 6                ], [                          ], [                              ], {"calabresa": 3,  "sucao": 6})
    #             ^    ^                                ^                             ^                                 ^
    #            uid   amigos                          quizzes_respondidos           meus_quizzes                       tags
    users = [bruno, jose, airton, pablo, juck]
    resultado = calcular_softmax(leo, users)
    variancia = np.var(resultado)
    media = np.mean(resultado)
    output = []
    
    output.append({ "resultado": list(zip([user.uid for user in users], resultado)), 
                    "media": media, 
                    "variancia": variancia})
    print(json.dumps(output))
    #for r in resultado:
    #    if r > media - variancia:
    #        print(r, " tem coisas em comum com voce")
    #    else:
    #        print(r, " não tem coisas em comum com voce")