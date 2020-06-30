def calculaAguaPosChuva(array):
    tam_array = len(array)
    agua_total = 0
    for i in range(1, tam_array-1):
      altura_atual = array[i]
      altura_esquerda = altura_atual
      for j in range(i):
          altura_esquerda = max(altura_esquerda, array[j])

      altura_direita = altura_atual
      for k in range(i+1, tam_array):
          altura_direita = max(altura_direita, array[k])

      agua_total = agua_total + (min(altura_esquerda, altura_direita) - altura_atual)

    return agua_total


print(calculaAguaPosChuva([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))
