// Importa a classe base 'Sala' para poder herdar dela.
const Sala = require('./Sala');

// Representa uma Sala Escura, uma versão especial de Sala onde a descrição muda
// dependendo se o jogador possui uma fonte de luz.
class SalaEscura extends Sala {
    // O construtor simplesmente chama o construtor da classe pai.
    constructor(nome, descricao) {
        super(nome, descricao);
    }

    // Sobrescreve o método mostrarDescricao para adicionar a lógica da escuridão.
    // Agora, este método precisa saber quem é o jogador para checar seu inventário.
    mostrarDescricao(jogador) {
        // Procura por um item chamado 'lanterna' no inventário do jogador.
        const temLanterna = jogador.inventario.find(item => item.nome === 'lanterna');

        // Se o jogador NÃO tiver a lanterna...
        if (!temLanterna) {
            console.log(`Você está na ${this.nome}.`);
            console.log("Está escuro demais para ver qualquer coisa aqui. Você precisa de uma fonte de luz.");
            // Apenas as saídas são mostradas, mas não os itens.
            const saidas = Object.keys(this.vizinhas).join(", ");
            console.log("Saídas: " + saidas);
        } else {
            // Se o jogador tiver a lanterna, a sala se comporta como uma sala normal.
            console.log("(Você usa sua lanterna para iluminar o caminho)");
            super.mostrarDescricao(jogador);
        }
    }
}

// Exporta a classe para que outros arquivos possam usá-la.
module.exports = SalaEscura;