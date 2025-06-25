// Importa a classe base 'Item'.
const InformacaoSecreta = require('./InformacaoSecreta');
const Item = require('./item');

// Representa o Computador, um item complexo que requer vários outros itens para funcionar.
class Computador extends Item {
    // Construtor da classe Computador.
    constructor(nome, descricao) {
        super(nome, descricao);
        // O computador é um item fixo no cenário, não pode ser pego.
        this.podeSerPego = false;
    }

    // Sobrescreve o método 'usar' com a lógica complexa do quebra-cabeça.
    // O método verifica o inventário do jogador para ver se ele tem os itens necessários.
    usar(jogador) {
        // Procura por cada um dos itens necessários no inventário do jogador.
        const temMonitor = jogador.inventario.find(item => item.nome === 'monitor');
        const temBilhete = jogador.inventario.find(item => item.nome === 'bilhete');
        const temCartao = jogador.inventario.find(item => item.nome === 'cartao de acesso');

        // Lógica condicional para dar dicas ao jogador ou resolver o enigma.

        // 1. O jogador não tem o monitor?
        if (!temMonitor) {
            return {
                sucesso: false,
                mensagem: "Você liga o computador, mas não há um monitor conectado. Você não consegue ver nada."
            };
        }

        // 2. Tem monitor, mas não tem o bilhete (login)?
        if (!temBilhete) {
            return {
                sucesso: false,
                mensagem: "O monitor se acende e mostra uma tela de login, mas você não sabe a senha."
            };
        }

        // 3. Tem monitor e bilhete, mas não tem o cartão de acesso?
        if (!temCartao) {
            return {
                sucesso: false,
                mensagem: "Você usa o código do bilhete (4815) para fazer o login. O sistema pede um cartão de acesso para continuar."
            };
        }

        // 4. Se o jogador tem todos os itens, o enigma é resolvido!
        if (temMonitor && temBilhete && temCartao) {
            // Aqui podemos criar um novo item que representa a "informação" que o jogador obteve.
            const informacaoFinal = new InformacaoSecreta("informacao secreta", "Um pendrive com os dados para desativar o sistema de segurança.");
            informacaoFinal.podeSerPego = true; // Este novo item pode ser pego!

            return {
                sucesso: true,
                mensagem: "Acesso autorizado! O computador processa os dados e ejeta um pendrive com as informações necessárias. Você as tem!",
                itemRevelado: informacaoFinal
            };
        }
    }
}

// Exporta a classe para ser usada no jogo.
module.exports = Computador;