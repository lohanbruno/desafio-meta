def procuraSomaNumArray(array, alvo): 
    tam_array = len(array)
    complementos_dict = {}
    for i in range (0, tam_array):
        complemento = alvo - array[i]
        if (array[i] in complementos_dict):
            return [complementos_dict[array[i]], i]
        complementos_dict[complemento] = i
    

print(procuraSomaNumArray([1,11,-4,-2], 9))
