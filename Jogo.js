// Importa todas as classes que representam as "peças" do nosso jogo.
const Sala = require('./Sala');
const Armario = require('./Armario');
const Item = require('./item');
const Chave = require('./chave');
const Martelo = require('./martelo');
const CaixaQuebravel = require('./caixaQuebravel');
const Jogador = require('./Jogador');
const SalaEscura = require('./SalaEscura');
const Computador = require('./Computador');
const DispositivoDeSeguranca = require('./DispositivoDeSeguranca');
const InformacaoSecreta = require('./InformacaoSecreta');

// Classe principal do jogo.
// É responsável por criar o cenário, controlar o estado do jogo e processar os comandos do jogador.
class Jogo {
  // Construtor da classe Jogo.
  constructor() {
    this.salas = {}; // Um objeto para guardar a referência de todas as salas criadas.
    this.jogador = null; // A instância do jogador será criada no 'criaCenario'.
    this.fim = false; // Uma "flag" que indica se o jogo deve terminar.
    this.passaJogoParaJogador = true
  }

  // Método que monta todo o cenário do jogo: salas, itens e conexões.
  criaCenario() {
    // Passo 1: Criar as instâncias de todas as salas.
    const laboratorio = new Sala("Laboratório", "Uma sala com equipamentos científicos e um computador empoeirado.");
    const salaControle = new Sala("Sala de Controle", "Painéis e monitores iluminam o ambiente com luzes intermitentes.");
    const oficinaSecreta = new Sala("Oficina Secreta", "Ferramentas e peças espalhadas por toda parte.");
    const deposito = new Sala("Depósito", "Caixas empilhadas do chão ao teto. O cheiro é de mofo e metal.");
    const salaDoArmario = new Sala("Sala do Armário", "Uma pequena sala escura com um grande armário de metal. A porta está trancada.");
    const corredorEscuro = new SalaEscura("Corredor Escuro", "Um corredor longo e úmido. A luz da sua lanterna revela os detalhes.");
    const salaDoServidor = new Sala("Sala do Servidor", "Muitos computadores e cabos. Faz um zumbido alto.");


    // Passo 2: Definir as saídas de cada sala, conectando o mapa.
    laboratorio.conectarSala("leste", salaControle);
    salaControle.conectarSala("oeste", laboratorio);
    salaControle.conectarSala("sul", oficinaSecreta);
    salaControle.conectarSala("norte", salaDoArmario);
    oficinaSecreta.conectarSala("norte", salaControle);
    oficinaSecreta.conectarSala("leste", deposito);
    deposito.conectarSala("oeste", oficinaSecreta);
    deposito.conectarSala("norte", corredorEscuro);
    corredorEscuro.conectarSala("sul", deposito);
    corredorEscuro.conectarSala("leste", salaDoServidor);
    salaDoServidor.conectarSala("oeste", corredorEscuro);
    salaDoArmario.conectarSala("sul", salaControle);


    // Passo 3: Criar as instâncias de todos os itens do jogo.
    const computador = new Computador("computador", "Um computador antigo com dados importantes. Parece precisar de um login.");
    const chave = new Chave("chave", "Uma chave de metal com um emblema estranho.", salaDoArmario);
    const monitor = new Item("monitor", "Um monitor que exibe mensagens de status do sistema.");
    const cartaoAcesso = new Item("cartao de acesso", "Um cartão magnético com o logotipo de uma corporação antiga.");
    const martelo = new Martelo("martelo", "Um martelo robusto e pesado. Ideal para quebrar coisas.");
    const bilhete = new Item("bilhete", "Um bilhete amassado com um código rabiscado: 4815. O que será isso?");
    const caixa = new CaixaQuebravel("caixa", "Uma caixa de madeira selada, parece frágil o suficiente para ser quebrada.", bilhete);
    const lanterna = new Item("lanterna", "Uma lanterna poderosa, ideal para locais escuros.");
    const armario = new Armario("armario", "Um grande armário de metal.", lanterna);
    const dispositivo = new DispositivoDeSeguranca("dispositivo de seguranca", "Um painel de controle complexo com um slot USB.");


    // Passo 4: Distribuir os itens pelas salas.
    laboratorio.adicionarItem(computador);
    laboratorio.adicionarItem(chave);
    salaControle.adicionarItem(monitor);
    salaControle.adicionarItem(cartaoAcesso);
    oficinaSecreta.adicionarItem(martelo);
    corredorEscuro.adicionarItem(caixa);
    salaDoArmario.adicionarItem(armario);
    salaDoServidor.adicionarItem(dispositivo);


    // Passo 5: Guardar a referência de todas as salas e criar a instância do jogador.
    this.salas = {
      laboratorio,
      salaControle,
      oficinaSecreta,
      deposito,
      salaDoArmario,
      corredorEscuro,
      salaDoServidor
    };
    this.jogador = new Jogador(laboratorio); // O jogador começa no laboratório.
    if(this.passaJogoParaJogador){
      this.jogador.jogo = this; // Dá ao jogador uma referência do jogo principal.
  }
  }

  // Exibe a mensagem inicial do jogo.
  iniciar() {
    console.log("Bem-vindo ao jogo de aventura! Tente escapar do complexo isolado.");
    console.log("Seu objetivo é encontrar uma maneira de desativar o sistema de segurança principal.");
    this.jogador.salaAtual.mostrarDescricao(this.jogador);
  }

  // Processa o comando que o jogador digitou no terminal.
  processarComando(comando) {
    // Separa a primeira palavra (a ação) do resto da frase (os argumentos).
    const [acao, ...args] = comando.toLowerCase().split(" ");

    // Estrutura switch para decidir o que fazer com base na ação.
    switch (acao) {
      case "mover":
        this.jogador.moverPara(args[0]);
        break;
      case "pegar":
        this.jogador.pegarItem(args.join(" "));
        break;
      
      // Lógica para o comando 'usar'.
      case "usar":
        const nomeItemParaUsar = args.join(" ");
        
        // --- LÓGICA ATUALIZADA ---
        // Tenta encontrar o item em dois lugares: primeiro no inventário, depois na sala.
        let item = this.jogador.inventario.find(i => i.nome === nomeItemParaUsar);
        let itemNaSala = false; // Flag para saber se o item está na sala

        // Se não encontrou no inventário, procura na sala atual
        if (!item) {
          item = this.jogador.salaAtual.itens.find(i => i.nome === nomeItemParaUsar);
          if (item) {
            itemNaSala = true;
          }
        }

        // Se o item foi encontrado em algum dos lugares...
        if (item) {
          // ...e se o item é um daqueles que precisa estar no inventário para usar (ex: chave, martelo)
          // mas o jogador está tentando usá-lo enquanto ele está na sala...
          if (item.podeSerPego && itemNaSala) {
            console.log(`Você precisa primeiro pegar o '${nomeItemParaUsar}' para poder usá-lo.`);
            break; // Sai do comando 'usar'
          }

          // Se passou pelas verificações, chama o método 'usar' do item.
          const resultado = item.usar(this.jogador);

          if (resultado) {
            console.log(resultado.mensagem);

            if (resultado.itemRevelado) {
              this.jogador.salaAtual.adicionarItem(resultado.itemRevelado);
              this.jogador.salaAtual.mostrarDescricao(this.jogador);
            }
          }
        } else {
          // Se não encontrou o item em lugar nenhum.
          console.log(`Não há nenhum item chamado '${nomeItemParaUsar}' aqui ou no seu inventário.`);
        }
        break;
        
      case "inventario":
        this.jogador.mostrarInventario();
        break;
      case "ajuda":
        this.mostrarAjuda();
        break;
      case "sair":
        this.fim = true; // Altera a flag para indicar o fim do jogo.
        console.log("Jogo encerrado. Espero que tenha se divertido!");
        break;
      default:
        console.log("Comando inválido. Digite 'ajuda' para ver os comandos disponíveis.");
        break;
    }
  }

  // Apenas exibe uma lista formatada dos comandos disponíveis.
  mostrarAjuda() {
    console.log("\n--- COMANDOS DISPONÍVEIS ---");
    console.log("- mover <direcao> (Ex: mover norte, mover leste)");
    console.log("- pegar <nome do item> (Ex: pegar chave, pegar martelo)");
    console.log("- usar <nome do item> (Ex: usar chave, usar martelo)");
    console.log("- inventario (Mostra os itens que você possui)");
    console.log("- ajuda (Exibe esta lista de comandos)");
    console.log("- sair (Encerra o jogo)");
    console.log("-----------------------------\n");
  }
}

// Exporta a classe Jogo para ser usada pelo index.js.
module.exports = Jogo;