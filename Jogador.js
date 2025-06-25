// Representa o jogador no jogo, controlando sua posição atual e os itens em seu inventário.
class Jogador {
  // O construtor é chamado quando o jogador é criado.
  constructor(salaInicial) {
    this.salaAtual = salaInicial; // Define a sala onde o jogador começa.
    this.inventario = [];         // O inventário começa como uma lista vazia.
  }

  // Tenta mover o jogador para uma sala vizinha em uma determinada direção.
  moverPara(direcao) {
    // Busca a sala correspondente à direção nas saídas da sala atual.
    const proximaSala = this.salaAtual.vizinhas[direcao];

    // Verifica se existe uma saída na direção informada.
    if (proximaSala) {
      // Se a saída existe, verifica se a próxima sala está trancada.
      // A propriedade 'estaTrancada' só existe em objetos da classe 'SalaTrancada'.
      if (proximaSala.estaTrancada) {
        console.log("Essa passagem está trancada. Você precisa destrancá-la primeiro.");
        return; // Impede a movimentação.
      }

      // Se não estiver trancada, atualiza a sala atual do jogador.
      this.salaAtual = proximaSala;
      console.log(`Você foi para a ${this.salaAtual.nome}.`);
      // Mostra a descrição completa da nova sala.
      this.salaAtual.mostrarDescricao(this);
    } else {
      // Se não houver saída naquela direção.
      console.log("Não há saída nessa direção.");
    }
  }

  // Tenta pegar um item que está na sala atual e adicioná-lo ao inventário.
  pegarItem(nomeItem) {
    // Primeiro, apenas TENTA ENCONTRAR o item na sala, sem removê-lo.
    const item = this.salaAtual.itens.find(i => i.nome === nomeItem);

    // Se o item existe na sala...
    if (item) {
      // ...verificamos se ele pode ser pego.
      if (item.podeSerPego) {
        // Se puder, aí sim o removemos da sala e adicionamos ao inventário.
        this.salaAtual.removerItem(nomeItem); // Agora a remoção acontece aqui.
        this.inventario.push(item);
        console.log(`Você pegou o item: ${item.nome}`);
      } else {
        // Mensagem de erro se o item não puder ser pego.
        console.log(`Você não pode pegar '${item.nome}'. É muito pesado ou está fixo no lugar.`);
      }
    } else {
      // Se o item não foi encontrado na sala.
      console.log(`Não há item chamado "${nomeItem}" aqui.`);
    }
  }

  // Exibe no console a lista de itens que o jogador está carregando.
  mostrarInventario() {
    // Verifica se o inventário está vazio.
    if (this.inventario.length === 0) {
      console.log("Seu inventário está vazio.");
    } else {
      // Transforma a lista de objetos de item em uma lista de nomes de item,
      // e junta tudo em uma única string separada por vírgula.
      const nomesDosItens = this.inventario.map(i => i.nome).join(", ");
      console.log("Itens no inventário: " + nomesDosItens);
    }
  }
}

// Exporta a classe Jogador para ser usada em outros arquivos.
module.exports = Jogador;