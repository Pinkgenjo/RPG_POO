// Importa a classe base 'Item'.
const Item = require('./item');

// Representa um Armário, um item que pode ser trancado e conter outro item.
class Armario extends Item {
    constructor(nome, descricao, recompensa) {
        super(nome, descricao);
        this.estaTrancado = true; // O armário começa sempre trancado.
        this.recompensa = recompensa; // O item que ele revela ao ser destrancado.
        this.podeSerPego = false; // O armário não pode ser pego pelo jogador.
    }

    // Método para destrancar o armário.
    destrancar() {
        if (this.estaTrancado) {
            this.estaTrancado = false;
            return {
                sucesso: true,
                mensagem: `Você destrancou o ${this.nome} e encontrou uma ${this.recompensa.nome} dentro!`,
                itemRevelado: this.recompensa
            };
        } else {
            return { sucesso: false, mensagem: "O armário já está aberto." };
        }
    }

    // O jogador não pode 'usar' o armário diretamente.
    usar() {
        if (this.estaTrancado) {
            return { sucesso: false, mensagem: `O ${this.nome} está trancado. Você precisa de uma chave.` };
        } else {
            return { sucesso: false, mensagem: "O armário está aberto e vazio." };
        }
    }
}

module.exports = Armario;