import { sumAll, sumExpensesForType } from "./sumAll/sumAll";
import { getExpenseName } from "./utils/sumUtils";
import FormatValue from "../../utils/forms/inputs/formatValue";

const formatValue = new FormatValue();

function fillTableSum() {
    let selectedType = document.getElementById('tipo').value;
    let soma;

    if (selectedType === 'somar tudo') { soma = sumAll(); } else { soma = sumExpensesForType(selectedType); }

    let corpoTabelaSomaDespesas = document.getElementById('corpoTabelaSomaDespesas');
    corpoTabelaSomaDespesas.innerHTML = '';
    let somaTotalDoTipo = 0;

    for (let tipo in soma) {
        if (soma[tipo] > 0) {
            let linha = corpoTabelaSomaDespesas.insertRow();
            linha.insertCell(0).innerHTML = getExpenseName(tipo);
            linha.insertCell(1).innerHTML = formatValue.formatValueList(soma[tipo]); // Formata apenas para exibição
            somaTotalDoTipo += soma[tipo];
        }
    }

    if (somaTotalDoTipo === 0) {
        document.getElementById('modal_title_div').className = 'modal-header text-warning';
        document.getElementById('botao').className = 'btn btn-danger';
        document.getElementById('botao').innerHTML = 'Voltar';
        document.getElementById('modal_title').innerText = 'Aviso';
        document.getElementById('texto-corpo').innerText = 'Não há despesas para o tipo selecionado.';

        $('#registraDespesas').modal('show');
    }
}

// Configura o evento de mudança no select
document.getElementById('tipo').addEventListener('change', fillTableSum);

// Executa ao carregar o DOM
document.addEventListener('DOMContentLoaded', () => {
    fillTableSum(); // Preenche a tabela inicial com base no valor padrão do select
});