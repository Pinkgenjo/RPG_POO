const Item = require('./item');
const DispositivoDeSeguranca = require('./DispositivoDeSeguranca');

// Representa o pendrive com os dados para vencer o jogo.
class InformacaoSecreta extends Item {
    constructor(nome, descricao) {
        super(nome, descricao);
    }

    // Sobrescreve o método 'usar' com a lógica final do jogo.
    usar(jogador) {
        // Verifica se o jogador está na Sala do Servidor.
        if (jogador.salaAtual.nome === "Sala do Servidor") {
            // Procura pelo dispositivo de segurança na sala.
            const dispositivo = jogador.salaAtual.itens.find(item => item instanceof DispositivoDeSeguranca);

            if (dispositivo) {
                // Se encontrou, chama o método para desativá-lo.
                return dispositivo.desativar(jogador);
            }
        }

        // Se não estiver na sala certa, ou se o dispositivo não estiver lá.
        return { sucesso: false, mensagem: "Não parece ser o lugar certo para usar isso." };
    }
}

module.exports = InformacaoSecreta;