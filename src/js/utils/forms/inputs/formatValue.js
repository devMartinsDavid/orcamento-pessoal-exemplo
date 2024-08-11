export default class FormatValue{
  constructor() {
    this.formatValueAdd = this.formatValueAdd.bind(this);
    this.formatValueList = this.formatValueList.bind(this);
    this.formatValueSearch = this.formatValueSearch.bind(this);
    this.removeFormat = this.removeFormat.bind(this);
  }

  formatValueAdd(event) {
    let input = event.target;
    let valor = input.value.replace(/[^\d]/g, '');//remove dígito

    valor = (valor / 100).toFixed(2);
    //br
    valor = parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'});
    input.value = valor;
  }

  formatValueList(value) {
    if (typeof value === 'string') { value = parseFloat(value.replace(/[^\d.-]/g, '')); }

    value = parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return value;
  }

  formatValueSearch(event) {
    let input = event.target;
    let valor = input.value.replace(/[^\d]/g, ''); // Remove tudo que não é dígito

    valor = (valor / 100).toFixed(2);
    input.value = parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // Método para remover a formatação BRL
  removeFormat(value) {
    return value.replace(/[R$\s.]/g, '').replace(',', '.');
  }

}