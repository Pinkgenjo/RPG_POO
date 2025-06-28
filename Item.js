// Classe base para todos os itens que podem ser encontrados no jogo.
// Outras classes de itens mais específicos (como Chave, Martelo, etc.) vão herdar desta.
class Item {
  #nome;
  #descricao;
  #podeSerPego;

  constructor(nome, descricao) {
    this.#nome = nome;
    this.#descricao = descricao;
    this.#podeSerPego = podeSerPego;
  }

  get nome() {
    return this.#nome;
  }

  get descricao() {
    return this.#descricao;
  }

  get podeSerPego() {
    return this.#podeSerPego;
  }

  // As subclasses (como Chave) irão sobrescrever este método com sua própria lógica.
  usar() {
    // Retorna um objeto de resultado padrão, indicando que nada aconteceu.
    return {
      sucesso: false,
      mensagem: `Você tentou usar o item: ${this.#nome}, mas nada aconteceu.`
    };
  }
}

// Exporta a classe Item para que outros arquivos possam importá-la e usá-la.
module.exports = Item;