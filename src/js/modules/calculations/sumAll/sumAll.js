

import Db from "../../db/db.js";

const db = new Db();

// Função para somar despesas por tipo
export function sumExpensesForType(selectedType) {
    let expenses = db.retrieveAllRecords();
    let sumExpensesForType = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };

    expenses.forEach(d => {
        if (d.tipo === selectedType) { let valor = d.valor; sumExpensesForType[d.tipo] += valor; }
    });

    return sumExpensesForType;
}

// Função para somar todas as despesas de cada tipo
export function sumAll() {
    let somaTotal = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 };

    for (let tipo in somaTotal) {
        let somaTipo = sumExpensesForType(tipo);
        somaTotal[tipo] = somaTipo[tipo];
    }

    return somaTotal;
}
