"""Modulo contendo funcoes utilitarias."""

import numpy as np


def ordenar_dict(*args):
    """Ordena n dicionarios baseados em suas chaves.

    :param args: dicionarios
    :return: uma lista dos valores do dicionario ordenados pelas suas chaves.

    Exemplo:
        ordenar_dict({'banana': 4, 'arroz': 10}, {'pudim': 8, 'queijo': 3, 'abobora': 78}, {...})
        -> [[10,4], [78, 8, 3], [...]]
    """
    ret = []
    for _dict in args:
        sorted_items = [item[1] for item in sorted(_dict.items(), key=lambda x: x[0])]
        ret.append(sorted_items)
    return ret


def soma_raiz_quadrada(x):
    """Retorna a raiz quadrada da soma dos quadrados de x, x sendo um array-like.

    :param x: array-like
    :return: raiz quadrada da soma dos quadrados de x.
    """
    return np.sqrt(np.sum([a * a for a in x]))
