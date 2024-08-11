export default class Expenses {
    constructor(data, tipo, descricao, valor) {
        this.data = data;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validateData() {
        for (let i in this) {
            if (this[i] === undefined || this[i] === '' || this[i] === null) { return false; }
        }
        return true;
    }
    // validateData() {
    //     return Object.values(this).every(value => value !== undefined && value !== '' && value !== null);
    // }

    getFormattedDate() {
        const [year, month, day] = this.data.split('-');
        return `${day}/${month}/${year}`;
    }
}