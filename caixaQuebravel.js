// Importa a classe base 'Item' para poder herdar dela.
const Item = require('./item');

// Representa um item especial que pode ser quebrado para revelar um item secreto.
// É uma subclasse de Item.
class CaixaQuebravel extends Item {
  // Construtor da classe CaixaQuebravel
  constructor(nome, descricao, itemOculto) {
    // Chama o construtor da classe pai (Item)
    super(nome, descricao);

    // Propriedades específicas desta classe
    this.estaQuebrada = false; // Controla se a caixa já foi ou não quebrada.
    this.itemOculto = itemOculto; // Guarda o item que será revelado.
    this.podeSerPego = false; // A caixa não pode ser pega pelo jogador, apenas quebrada.
  }

  // Método que 'quebra' a caixa. Geralmente chamado por outra ferramenta, como um martelo.
  // Em vez de imprimir no console, ele retorna um objeto para a classe Jogo processar.
  quebrar() {
    // Só permite quebrar se a caixa ainda não foi quebrada
    if (!this.estaQuebrada) {
      this.estaQuebrada = true;

      // Retorna um objeto de resultado com sucesso, uma mensagem e o item revelado
      return {
        sucesso: true,
        mensagem: `Você quebrou a ${this.nome} e revelou um ${this.itemOculto.nome}!`,
        itemRevelado: this.itemOculto,
        itemARemover: this // Informa ao jogo para remover a caixa da sala após ser quebrada.
      };
    } else {
      // Se já foi quebrada, retorna um resultado de falha com uma mensagem.
      return { 
        sucesso: false, 
        mensagem: `A ${this.nome} já está quebrada.` 
      };
    }
  }

  // Sobrescreve o método 'usar' padrão da classe Item.
  // Uma caixa não pode ser 'usada' diretamente pelo jogador.
  usar() {
    return {
      sucesso: false,
      mensagem: `Você não pode 'usar' a ${this.nome} diretamente. Talvez precise de uma ferramenta.`
    };
  }
}

// Exporta a classe para que outros arquivos possam usá-la.
module.exports = CaixaQuebravel;