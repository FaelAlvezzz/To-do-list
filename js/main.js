import * as Tarefas from './tarefas.js';
import * as Storage from './storage.js';
import * as UI from './ui.js';

let listaTarefas = Storage.carregar();
let indexSendoEditado = null;

function renderizar() {
  UI.elementos.listaPendentes.innerHTML = '';
  UI.elementos.listaConcluidas.innerHTML = '';

  listaTarefas.forEach((tarefa, index) => {
    const card = UI.criarCard(tarefa, index, {
      aoAlternar: (i) => { listaTarefas = Tarefas.alternar(listaTarefas, i); atualizar(); },
      aoDeletar: (i) => { listaTarefas = Tarefas.remover(listaTarefas, i); atualizar(); },
      aoEditar: (i) => { indexSendoEditado = i; UI.gerenciarModal(true, listaTarefas[i].texto); }
    });

    if(tarefa.concluido) UI.elementos.listaConcluidos.appendChild(card);
    else UI.elementos.listaPendentes.appendChild(card);
  });
}

function atualizar() {
  Storage.salvar(listaTarefas);
  renderizar();
}

window.adicionarTarefa = () => {
  const texto = UI.elementos.inputPrincipal.value.trim();
  if(texto) {
    listaTarefas = Tarefas.adicionar(listaTarefas, texto);
    UI.elementos.inputPrincipal.value = '';
    atualizar();
  }
};

window.salvarEdicao = () => {
  const novoTexto = UI.elementos.inputEditar.value.trim();
  if (novoTexto) {
    listaTarefas = Tarefas.editar(listaTarefas, indexSendoEditado, novoTexto);
    UI.gerenciarModal(false);
    atualizar();
  }
};

window.fecharModal = () => UI.gerenciarModal(false);

window.apagarTudoConcluidas = () => {
  if(confirm("Deseja realmente apagar todas as tarefas? ")) {
    listaTarefas = Tarefas.filtrarConcluidas(listaTarefas);
    atualizar();
  }
};

// Listener dos teclados
UI.elementos.inputPrincipal.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') window.adicionarTarefa();
});


//Registrar usuário
window.registrar = async () => {
    // 1. Captura os valores dos inputs
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value.trim();

    // Validação básica antes de enviar
    if (!email || !password) {
        return alert("Preencha todos os campos!");
    }

    try {
        // 2. Faz a chamada POST para o seu servidor
        const response = await fetch('/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email: email, 
                password: password
            })
        });

        const data = await response.json();

        // 3. Trata a resposta do servidor
        if (response.ok) {
            alert("Sucesso: " + data.message);
            // Limpa os campos
            document.getElementById('reg-email').value = '';
            document.getElementById('reg-password').value = '';
        } else {
            alert("Erro: " + (data.error || "Não foi possível cadastrar."));
        }

    } catch (error) {
        console.error("Erro na comunicação com o servidor:", error);
        alert("O servidor está offline ou houve um erro de rede.");
    }
};

//Login do usuário
export async function fazerLogin() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const response = await fetch('/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Sucesso: " + data.message);
            localStorage.setItem('usuario', JSON.stringify(data.user));
        } else {
            alert("Erro: " + (data.error || "Falha no login"));
        }
    } catch (error) {
        console.error("Erro na conexão:", error);
    }
}

window.fazerLogin = fazerLogin;

//função para login, armazenando o token no localStorage para futuras requisições autenticadas
window.login = async () => {
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  try {
      const response = await fetch('/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if(response.ok) {
        alert("Bem vindo, " + data.user.first_name + "!");
        localStorage.setItem('token', data.token); // Armazena o token para futuras requisições
      }else {
        alert("Erro: " + data.error);
      }
  
    } catch (error) {
      console.error("Erro ao conectar com a API:", error);
      alert("Servidor fora do ar!");
      }
}

// Inicialização
renderizar();