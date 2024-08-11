export default class Db {
    constructor() {
        let id = localStorage.getItem('id');
        if (id === null) { localStorage.setItem('id', 0); }
    }

    getNextId() {
        let nextId = localStorage.getItem('id');
        return parseInt(nextId) + 1;
    }

    grave(expense) {
        let id = this.getNextId();
        localStorage.setItem(id, JSON.stringify(expense));
        localStorage.setItem('id', id);
    }

    retrieveAllRecords() {
        let expenses = [];
        let id = localStorage.getItem('id');
        for (let i = 1; i <= id; i++) {
            let expense = JSON.parse(localStorage.getItem(i));
            if (expense === null) { continue; }
            expense.id = i;
            expenses.push(expense);
            console.log('Recuperou despesas')
        }
        return expenses;
    }

    search(filters) {
        return this.records.filter(expense => {
            return Object.keys(filters).every(key => expense[key] === filters[key] || filters[key] === '');
        });
    }


    remove(id) { localStorage.removeItem(id); }
}
