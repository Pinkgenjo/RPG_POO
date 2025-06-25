// Representa um ambiente genérico (uma sala) no jogo.
// É a classe base para todos os locais do mapa.
class Sala {
  // Construtor da classe Sala.
  constructor(nome, descricao) {
    this.nome = nome;          // O nome da sala (ex: "Laboratório").
    this.descricao = descricao;    // O texto descritivo que o jogador lê.
    this.itens = [];           // Uma lista para guardar os objetos de Item presentes na sala.
    this.vizinhas = {};      // Um objeto para guardar as saídas (ex: { norte: outraSala }).
  }

  // Adiciona um objeto de Item à lista de itens da sala.
  adicionarItem(item) {
    this.itens.push(item);
  }

  // Remove um item da sala procurando pelo seu nome.
  removerItem(nomeItem) {
    // Encontra o índice (a posição) do item na lista de itens.
    const index = this.itens.findIndex(item => item.nome === nomeItem);

    // Se o item foi encontrado (findIndex retorna -1 se não encontra)...
    if (index >= 0) {
      // Remove o item da lista e o retorna.
      // O método 'splice' retorna um array com os itens removidos, por isso usamos '[0]' para pegar o item em si.
      return this.itens.splice(index, 1)[0];
    }
    
    // Se não encontrou o item, retorna nulo.
    return null;
  }

  // Cria uma conexão (uma saída) desta sala para outra em uma direção específica.
  conectarSala(direcao, sala) {
    this.vizinhas[direcao] = sala;
  }

  // Exibe no console a descrição completa e o estado atual da sala.
  // Isso é o que o jogador "vê" quando entra ou olha ao redor.
  mostrarDescricao() {
    console.log(`Você está na ${this.nome}.`);
    console.log(this.descricao);

    // Lista os itens presentes na sala, se houver algum.
    if (this.itens.length > 0) {
      const nomesDosItens = this.itens.map(i => i.nome).join(", ");
      console.log("Itens aqui: " + nomesDosItens);
    } else {
      console.log("Não há itens aqui.");
    }

    // Lista as saídas disponíveis (norte, sul, etc.).
    const saidas = Object.keys(this.vizinhas).join(", ");
    console.log("Saídas: " + saidas);
  }
}

// Exporta a classe Sala para ser usada em outros arquivos.
module.exports = Sala;