const typeExpense = { '1': 'Alimentação', '2': 'Educação', '3': 'Lazer', '4': 'Saúde', '5': 'Transporte' };

export function getExpenseName(numeroTipo) {
    return typeExpense[numeroTipo] || 'Tipo não especificado';
}