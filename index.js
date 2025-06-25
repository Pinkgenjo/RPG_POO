// Arquivo principal que inicia o jogo.
// Ele é responsável por criar a interface de linha de comando e gerenciar o loop do jogo.

// Importa o módulo 'readline' do Node.js para ler o que o usuário digita no terminal.
const readline = require("readline");
// Importa a nossa classe principal que contém toda a lógica do jogo.
const Jogo = require("./Jogo");

// -- CONFIGURAÇÃO INICIAL DO JOGO --

// 1. Cria uma nova instância da classe Jogo.
const jogo = new Jogo();
// 2. Chama o método que cria as salas, itens e conecta tudo.
jogo.criaCenario();
// 3. Exibe a mensagem de boas-vindas e a descrição da primeira sala.
jogo.iniciar();

// -- INTERFACE DE LINHA DE COMANDO --

// Cria a interface que vai ler a entrada do usuário (input) e escrever a saída (output).
const rl = readline.createInterface({
  input: process.stdin,  // Define que a entrada virá do teclado.
  output: process.stdout, // Define que a saída será exibida no terminal.
  prompt: "> "           // O texto que aparecerá para o usuário digitar seu comando.
});

// Exibe o prompt ("> ") pela primeira vez para o jogador saber que pode digitar.
rl.prompt();

// -- LOOP PRINCIPAL DO JOGO --

// Define um "ouvinte" para o evento 'line'. Isso acontece toda vez que o usuário digita algo e aperta Enter.
rl.on("line", (linha) => {
  // A variável 'linha' contém o texto digitado pelo usuário.
  // Enviamos o comando para a classe Jogo, que vai cuidar da lógica.
  jogo.processarComando(linha.trim());

  // Após processar o comando, verificamos se o jogo terminou.
  if (jogo.fim) {
    // Se o jogo terminou (ex: jogador digitou 'sair'), fechamos a interface.
    rl.close();
  } else {
    // Se o jogo continua, mostramos o prompt ("> ") de novo para o próximo comando.
    rl.prompt();
  }
});

// -- FIM DO JOGO --

// Define um "ouvinte" para o evento 'close', que acontece quando a interface é fechada.
rl.on("close", () => {
  console.log("Obrigado por jogar!");
  // Encerra o programa.
  process.exit(0);
});