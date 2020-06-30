def isBracketsBalanceados(sequencia):
    pilha = []
    brackets_abertura = ["[","{","("]
    for bracket in sequencia:
        if (bracket in brackets_abertura):
            pilha.append(bracket)
        else:
            if (isPilhaVazia(pilha)):
                return "NAO"
            bracket_aberto = pilha.pop()
            if (not isParesBracket(bracket_aberto, bracket)):
                return "NAO"
    if (not isPilhaVazia(pilha)):
        return "NAO"
    return "SIM"

def isPilhaVazia(pilha):
    return len(pilha) == 0

def isParesBracket(bracket_abertura, bracket_fechamento):
    if bracket_abertura == "[" and bracket_fechamento != "]":
        return False
    if bracket_abertura == "{" and bracket_fechamento != "}":
        return False
    if bracket_abertura == "(" and bracket_fechamento != ")":
        return False
    return True

print(isBracketsBalanceados("{{[[(())]]}}"))