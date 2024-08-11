import Db from '../db/db.js'
import Expense from './expenses/expenses.js'

export default class ManagerExpenses {
    constructor() {
        this.db = new Db();
        this.expenses = this.db.retrieveAllRecords().map(d => new Expense(d.data, d.tipo, d.descricao, d.valor));
    }

    addExpenses(expense) {
        if(expense.validateData()){
            this.db.grave(expense);
            this.expenses.push(expense);
        } else { throw new Error('Dados inválidos') }
    }

    getAllExpenses() { return this.expenses; }

    searchExpenses(criteria) {
        return this.expenses.filter(expense => {
            return Object.keys(criteria).every(key => {
                if (criteria[key] === '') return true;
                if (key === 'data' || key === 'type' || key === 'description' || key === 'value') { return expense.data, expense.tipo, expense.descricao, expense.valor === criteria[key]; }
                return false;
            });
        });
    }

    removeExpense(id) {
        this.db.remove(id);
        this.expenses = this.expenses.filter(d => d.id != id);
    }
}