// Representa o jogador no jogo, controlando sua posição atual e os itens em seu inventário.
class Jogador {
  #salaAtual;
  #inventario;
  #tamanhoMaximoInventario;
  
  // Referência ao jogo principal para poder alterar o estado 'fim'.
  jogo;

  // O construtor é chamado quando o jogador é criado.
  constructor(salaInicial) {
    this.#salaAtual = salaInicial; // Define a sala onde o jogador começa.
    this.#inventario = [];         // O inventário começa como uma lista vazia.
    this.#tamanhoMaximoInventario = 5; // Define o tamanho máximo do inventário.
  }

  // Permitem que o código de fora da classe leia os dados privados de forma segura.
  get salaAtual() {
    return this.#salaAtual;
  }

  get inventario() {
    return this.#inventario;
  }

  // Tenta mover o jogador para uma sala vizinha em uma determinada direção.
  moverPara(direcao) {
    // Busca a sala correspondente à direção nas saídas da sala atual.
    const proximaSala = this.#salaAtual.vizinhas[direcao];

    // Verifica se existe uma saída na direção informada.
    if (proximaSala) {
      // Se a saída existe, verifica se a próxima sala está trancada.
      if (proximaSala.estaTrancada) {
        console.log("Essa passagem está trancada. Você precisa destrancá-la primeiro.");
        return; // Impede a movimentação.
      }

      // Se não estiver trancada, atualiza a sala atual do jogador.
      this.#salaAtual = proximaSala;
      console.log(`Você foi para a ${this.#salaAtual.nome}.`);
      // Mostra a descrição completa da nova sala.
      this.#salaAtual.mostrarDescricao(this);
    } else {
      // Se não houver saída naquela direção.
      console.log("Não há saída nessa direção.");
    }
  }

  // Tenta pegar um item que está na sala atual.
  pegarItem(nomeItem) {
    // Verifica se o inventário já está cheio.
    if (this.#inventario.length >= this.#tamanhoMaximoInventario) {
      console.log("Seu inventário está cheio. Você precisa largar um item para pegar outro.");
      return; // Impede que o resto do código seja executado.
    }

    //Se não estiver cheio, tenta pegar o item.
    const item = this.#salaAtual.itens.find(i => i.nome === nomeItem);

    if (item) {
      if (item.podeSerPego) {
        this.#salaAtual.removerItem(nomeItem);
        this.#inventario.push(item);
        console.log(`Você pegou o item: ${item.nome}`);
      } else {
        console.log(`Você não pode pegar '${item.nome}'. É muito pesado ou está fixo no lugar.`);
      }
    } else {
      console.log(`Não há item chamado "${nomeItem}" aqui.`);
    }
  }

  // Remove um item do inventário do jogador e o coloca na sala atual.
  largarItem(nomeItem){
    // Procura o item no inventário pelo nome.
    const indexDoItem = this.#inventario.findIndex(item => item.nome === nomeItem);

    // Se o item for encontrado no inventário...
    if (indexDoItem >= 0){
      // Remove o item do inventário e guarda em uma variável.
      const item = this.#inventario.splice(indexDoItem, 1)[0];
      // Adiciona o item de volta na sala atual.
      this.#salaAtual.adicionarItem(item);
      console.log(`Você largou o item: ${item.nome}`);
    } else {
      // Se não encontrou o item no inventário.
      console.log(`Você não tem nenhum item chamado "${nomeItem}" no seu inventário.`);
    }
  }

  // Exibe no console a lista de itens que o jogador está carregando.
  mostrarInventario() {
    // Verifica se o inventário está vazio.
    if (this.#inventario.length === 0) {
      console.log("Seu inventário está vazio.");
    } else {
      // Transforma a lista de objetos de item em uma lista de nomes de item,
      // e junta tudo em uma única string separada por vírgula.
      const nomesDosItens = this.#inventario.map(i => i.nome).join(", ");
      console.log("Itens no inventário: " + nomesDosItens);
    }
  }
}

module.exports = Jogador;