"""Esse modulo e reponsavel pelo calculo da similaridade entre cossenos."""
import numpy as np
from util import soma_raiz_quadrada


def similaridade_cossenos(matriz):
    """Calcula a similaridade entre cossenos em uma matriz com 2 linhas e n colunas.

    :param matriz: Uma matriz 2,n
    :return: Um numero [0,1] representando a similaridade entre as duas linhas.
    """
    numerador = np.sum(a * b for a, b in zip(matriz[0], matriz[1]))
    denominador = (soma_raiz_quadrada(matriz[0]) * soma_raiz_quadrada(matriz[1])) or 1
    return numerador / denominador

