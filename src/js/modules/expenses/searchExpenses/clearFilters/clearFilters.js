import ManagerExpenses from "./../../managerExpenses.js";
import ExpenseTable from "./../../table/expenseTable.js";

export function clearFilters() {
    const manager = new ManagerExpenses();

    // Limpa os valores dos campos de filtro
    $('#data').val('');
    $('#tipo').val('');
    $('#descricao').val('');
    $('#valor').val('');

    // Recupera tudo de novo
    const allExpenses = manager.getAllExpenses();
    const expenseTable = new ExpenseTable('expensesTable', allExpenses);
    expenseTable.render();
}