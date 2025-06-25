// Importa a classe base 'Item' e a classe 'CaixaQuebravel' para que o martelo possa interagir com ela.
const Item = require('./item');
const CaixaQuebravel = require('./caixaQuebravel');

// Representa um Martelo, um tipo de Item usado para quebrar outros objetos.
// Herda da classe base 'Item'.
class Martelo extends Item {
  // Construtor da classe Martelo.
  constructor(nome, descricao) {
    // Chama o construtor da classe pai (Item).
    super(nome, descricao);
  }

  // Sobrescreve o método 'usar' para implementar a lógica de quebrar um objeto.
  // Recebe o jogador como parâmetro para ter acesso à sala atual e seus itens.
  usar(jogador) {
    // Procura por um item que seja uma 'CaixaQuebravel' na mesma sala que o jogador.
    const itemQuebravel = jogador.salaAtual.itens.find(item =>
      item instanceof CaixaQuebravel && !item.estaQuebrada
    );

    // Se um item quebrável foi encontrado na sala...
    if (itemQuebravel) {
      // Chama o método 'quebrar' da própria caixa.
      // O método 'quebrar' da caixa já retorna um objeto de resultado formatado.
      // Nós apenas repassamos esse resultado para a classe Jogo.
      return itemQuebravel.quebrar();
    } else {
      // Se não houver nada para quebrar, retorna um resultado de falha.
      return {
        sucesso: false,
        mensagem: `Você brandiu o ${this.nome}, mas não há nada para quebrar aqui.`
      };
    }
  }
}

// Exporta a classe Martelo para ser usada em outros arquivos.
module.exports = Martelo;