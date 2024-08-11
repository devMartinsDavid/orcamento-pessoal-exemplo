let dataHoje = new Date();
let dia = String(dataHoje.getDate()).padStart(2, '0');
let mes = String(dataHoje.getMonth() + 1).padStart(2, '0'); // Os meses são indexados a partir de 0 em JavaScript
let ano = dataHoje.getFullYear();

let dataFormatada = `${dia}-${mes}-${ano}`;
console.log(`${dataFormatada}veio do setdate`);

document.addEventListener('DOMContentLoaded', () => {
    const dataElement = document.getElementById('data');
    if (dataElement) {
        dataElement.value = dataFormatada;
        console.log('formatou a data e inserida no input')
    } else {
        console.error('Elemento de data não encontrado');
    }
});
