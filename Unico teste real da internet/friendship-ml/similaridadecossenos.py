import numpy as np


def ordenar_dict(*args):
    ret = []
    for _dict in args:
        sorted_items = [item[1] for item in sorted(_dict.items(), key=lambda x: x[0])]
        ret.append(sorted_items)
    return ret


def raiz_quadrada(x):
    return np.sqrt(np.sum([a * a for a in x]))


def similaridade_cossenos(matriz):
    numerador = np.sum(a * b for a, b in zip(matriz[0], matriz[1]))
    denominador = raiz_quadrada(matriz[0]) * raiz_quadrada(matriz[1]) + 1
    return numerador / denominador

