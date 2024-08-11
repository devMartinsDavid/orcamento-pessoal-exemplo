export default class SearchExpenses {
    constructor(manager) {
        this.manager = manager;
    }

    search(criteria) {
        return this.manager.getAllExpenses().filter(expense => {
            return Object.keys(criteria).every(key => {
                if (criteria[key] === '') return true;
                if (key === 'data') {
                    return expense.data === criteria[key];
                } else if (key === 'tipo') {
                    return expense.tipo === criteria[key];
                } else if (key === 'descricao') {
                    return expense.descricao.includes(criteria[key]);
                } else if (key === 'valor') {
                    return expense.valor === parseFloat(criteria[key]);
                }
                return false;
            });
        });
    }
}