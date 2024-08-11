import ManagerExpenses from "./../managerExpenses.js"
import Expense from "../expenses/expenses.js";
import { loadTemplate } from "../../../utils/loadtemplates/loadTemplates.js";
import FormatValue from "../../../utils/forms/inputs/formatValue.js";


document.addEventListener('DOMContentLoaded', () => {
    const manager = new ManagerExpenses();
    const  formatValue = new FormatValue();


    const form = document.getElementById('formDespesas');
    const valorElement = document.getElementById('valor');

    if (form) {
        if(valorElement) {  valorElement.addEventListener('input',formatValue.formatValueAdd); }
        form.addEventListener('submit', async (event) => { event.preventDefault();
            //pega valor do campo
            const dataElement = document.getElementById('data');
            const tipoElement = document.getElementById('tipo');
            const descricaoElement = document.getElementById('descricao');
            const valorElement = document.getElementById('valor');
            //se existe
            const data = dataElement ? dataElement.value : '';
            const tipo = tipoElement ? tipoElement.value : '';
            const descricao = descricaoElement ? descricaoElement.value : '';
            const valorString = valorElement ? valorElement.value.replace(/[^\d,-]/g, '').replace(',', '.') : '0';
            const valor = parseFloat(valorString);
            //testes
            try {
                //validação
                if (!data || !tipo || !descricao || isNaN(valor) || valor <= 0) { throw new Error('Campos obrigatórios não preenchidos'); }

                const expense = new Expense(data, tipo, descricao, valor);
                //cadastra
                manager.addExpenses(expense);

                Array.from(form.elements).forEach(e => { if (e.id !== 'data') { e.value = ""; } });

                await loadTemplate('./../../views/templates/modals/modal_success.html').then(() => {
                    document.getElementById('modal_title').textContent = 'Despesa cadastrada!';
                    document.getElementById('modal_title_div').className = 'modal-header text-success';
                    $('#modalSuccess').modal('show');
                    setTimeout(() => { $('#modalSuccess').modal('hide'); }, 2000);
                });

            } catch (error) {
                if (error.message === 'Campos obrigatórios não preenchidos') {
                    await loadTemplate('./../../views/templates/modals/modal_preencher_campos.html').then(() => {
                        document.getElementById('modal_title_error').textContent = 'Ops! Preencha todos os campos!';
                        document.getElementById('modal_title_div_error').className = 'modal-header text-danger';
                        $('#error').modal('show');
                        setTimeout(() => { $('#error').modal('hide'); }, 1000);
                    });
                } else {
                    await loadTemplate('./../../views/templates/modals/modal_error.html').then(() => {
                        document.getElementById('modal_title').textContent = 'Ops! Algo deu errado!';
                        document.getElementById('modal_title_div').className = 'modal-header text-danger';
                        document.getElementById('texto-corpo').textContent = 'A despesa não foi cadastrada, verifique as permissões do seu navegador';
                        document.getElementById('botao').className = 'btn btn-danger';
                        document.getElementById('botao').textContent = 'Voltar';
                        $('#genericModalError').modal('show');
                        setTimeout(() => { $('#genericModalError').modal('hide'); }, 3000);
                    });
                }
            }
        });
    }
});