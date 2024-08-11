import FormatValue from "../../../utils/forms/inputs/formatValue.js";

export default class ExpenseTable {
    constructor(tableID, expenses, rowsPerPage = 5) {
        this.tableID = tableID;
        this.expenses = expenses;
        this.rowsPerPage = rowsPerPage;
        this.currentPage = 1;
        this.formatValue = new FormatValue();
    }
    //renderiza tabela
    render() {
        const table = $(`#${this.tableID}`);
        if (table.length === 0) {
            console.error(`Elemento com ID ${this.tableID} não encontrado.`);
            return;
        }

        const tbody = table.find('tbody');
        if (tbody.length === 0) {
            console.error('Elemento tbody não encontrado.');
            return;
        }

        tbody.empty();

        const start = (this.currentPage - 1) * this.rowsPerPage;
        const end = start + this.rowsPerPage;
        const paginatedExpenses = this.expenses.slice(start, end);

        paginatedExpenses.forEach(expense => {
            const valueFormated = this.formatValue.formatValueList(expense.valor)
            const row = `
                <tr>
                    <td>${expense.getFormattedDate()}</td>
                    <td>${this.getExpenseType(expense.tipo)}</td>
                    <td>${expense.descricao}</td>
                    <td>${valueFormated}</td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    getExpenseType(type) {
        const types = { '1': 'Alimentação', '2': 'Educação', '3': 'Lazer', '4': 'Saúde', '5': 'Transporte' };
        return types[type] || 'Tipo não especificado';
    }

    setPage(page) {
        this.currentPage = page;
        this.render();
    }
}