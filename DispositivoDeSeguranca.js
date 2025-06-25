// Importa a classe base 'Item'.
const Item = require('./item');

// Representa o painel de segurança final do jogo.
class DispositivoDeSeguranca extends Item {
    // Construtor da classe.
    constructor(nome, descricao) {
        super(nome, descricao);
        // É um item fixo no cenário, não pode ser pego.
        this.podeSerPego = false;
        this.desativado = false; // Controla se o sistema já foi desativado.
    }

    // Método especial para ser chamado quando o item correto é usado nele.
    desativar(jogador) {
        if (!this.desativado) {
            this.desativado = true;
            // Define a flag 'fim' no jogo como true para terminar o loop principal.
            jogador.jogo.fim = true;

            return {
                sucesso: true,
                // Esta é a mensagem de vitória!
                mensagem: "Você insere o pendrive. As luzes do painel piscam freneticamente e depois ficam verdes. UM ALARME SILENCIA. Uma porta secreta se abre na parede oposta. Você conseguiu! Você escapou!\n--- FIM DE JOGO ---"
            };
        } else {
            return { sucesso: false, mensagem: "O sistema de segurança já foi desativado." };
        }
    }

    // O que acontece quando o jogador tenta 'usar' o dispositivo diretamente.
    usar() {
        if (!this.desativado) {
            return { sucesso: false, mensagem: `O ${this.nome} tem um slot USB e um painel complexo. Parece precisar de dados específicos para ser operado.` };
        } else {
            return { sucesso: false, mensagem: "O painel mostra um status 'SISTEMA DESATIVADO'." };
        }
    }
}

module.exports = DispositivoDeSeguranca;