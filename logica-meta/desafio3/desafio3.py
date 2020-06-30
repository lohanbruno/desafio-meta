def lucroMaximo(acoes):
    lucro_maximo = 0
    acao_mais_barata = acoes[0]
    tam_arr = len(acoes)
    for i in range(1, tam_arr):
        if (acoes[i] - acao_mais_barata > lucro_maximo):
            lucro_maximo = acoes[i] - acao_mais_barata
        if (acao_mais_barata > acoes[i]):
            acao_mais_barata = acoes[i]
    return lucro_maximo

print(lucroMaximo([7,1,5,3,6,4]))