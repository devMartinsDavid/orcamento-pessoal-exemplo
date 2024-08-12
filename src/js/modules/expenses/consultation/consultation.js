// import Db  from './../../db/db.js'
import ManagerExpenses from "./../managerExpenses.js";
import ExpenseTable from "./../table/expenseTable.js";
import SearchExpenses from "./../searchExpenses/searchExpenses.js";
import FormatValue from "./../../../utils/forms/inputs/formatValue.js";
import { clearFilters } from "./../searchExpenses/clearFilters/clearFilters.js";

$(document).ready( () =>  {
    const formatValue = new FormatValue();
    const manager = new ManagerExpenses();
    const searchExpenses = new SearchExpenses(manager);

    const expenses = manager.getAllExpenses();
    const expenseTable = new ExpenseTable('expensesTable', expenses);
    expenseTable.render();

    $('#valor').on('input', (event) => { formatValue.formatValueSearch(event); });

    $('#searchButton').on('click', () => {
        //lógica valor para pesquisa
        const valorFormatado = $('#valor').val();
        const valorPesquisa = formatValue.removeFormat(valorFormatado);

        const criteria = { data: $('#data').val(), tipo: $('#tipo').val(), descricao: $('#descricao').val(), valor: valorPesquisa };

        const filteredExpenses = searchExpenses.search(criteria);
        const filteredExpenseTable = new ExpenseTable('expensesTable', filteredExpenses);
        filteredExpenseTable.render();


    });

    $('#clearFiltersButton').on('click', clearFilters);


    $('#prevPage').on('click', () => {
        if (expenseTable.currentPage > 1) { expenseTable.setPage(expenseTable.currentPage - 1); }
    });

    $('#nextPage').on('click', () => {
        const totalPages = Math.ceil(expenses.length / expenseTable.rowsPerPage);
        if (expenseTable.currentPage < totalPages) { expenseTable.setPage(expenseTable.currentPage + 1); }
    });
});
