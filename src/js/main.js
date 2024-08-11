document.addEventListener('DOMContentLoaded', () => {

    const path = window.location.pathname;

    //módulos específicos para cada página
    if (path === '/' || path.includes('index.html')) {

        import('./modules/expenses/addExpenses/addExpenses.js')
            .then(module => { console.log('cadastrarDespesas carregado com sucesso.');})
            .catch(error => { console.error('Erro ao carregar o módulo cadastrarDespesas:', error); });

        import('./utils/forms/dates/setDate.js')
            .then(module => { console.log('setDate.js carregado com sucesso');
            }).catch(error => { console.error('Erro ao carregar o módulo setDate:', error); });

    } else if (path.includes('consulta.html')) {

        import('./modules/expenses/consultation/consultation.js')
            .then(module => { console.log('consulta carregado com sucesso.'); })
            .catch(error => { console.error('Erro ao carregar o módulo consulta:', error);});

    } else if (path.includes('soma.html')) {

        import('./modules/calculations/summExpense.js')
            .then(module => { console.log('soma carregado com sucesso.'); })
            .catch(error => { console.error('Erro ao carregar o módulo soma:', error); });

    }
});