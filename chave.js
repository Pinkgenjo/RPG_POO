const Item = require('./item');
const Armario = require('./Armario'); // A Chave precisa saber o que é um Armario para procurar por ele.

// Representa uma Chave, um item usado para interagir com objetos trancados.
// Herda da classe base 'Item'.
class Chave extends Item {
    // O construtor agora é o mesmo de um Item genérico.
    // A chave não precisa mais saber qual sala é seu alvo, pois ela age em um item.
    constructor(nome, descricao) {
        super(nome, descricao);
    }

    // Sobrescreve o método 'usar' com a lógica correta de procurar e destrancar um Armario.
    usar(jogador) {
        // Procura por um item que seja uma instância de 'Armario' na sala atual do jogador.
        const armario = jogador.salaAtual.itens.find(item => item instanceof Armario);

        // Se um armário foi encontrado na sala...
        if (armario) {
            // ...e se ele ainda estiver trancado...
            if (armario.estaTrancado) {
                // ...chama o método 'destrancar' do próprio armário.
                // O armário é quem sabe como se abrir e qual é a recompensa.
                // Nós apenas repassamos o resultado que o armário nos der.
                return armario.destrancar();
            } else {
                // Se o armário já foi destrancado.
                return { sucesso: false, mensagem: "O armário nesta sala já está aberto." };
            }
        } else {
            // Se não houver nenhum armário na sala.
            return { sucesso: false, mensagem: "Não há nada aqui que esta chave possa abrir." };
        }
    }
}

// Exporta a classe Chave.
module.exports = Chave;